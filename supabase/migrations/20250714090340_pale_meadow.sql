/*
  # Create utility functions and triggers

  1. Functions
    - Update timestamp function
    - Notification creation functions
    - Statistics functions
  
  2. Triggers
    - Auto-update timestamps
    - Auto-create notifications
*/

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at
  BEFORE UPDATE ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id uuid,
  p_title text,
  p_message text,
  p_type text DEFAULT 'info'
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (user_id, title, message, type)
  VALUES (p_user_id, p_title, p_message, p_type)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to notify vendor of new booking
CREATE OR REPLACE FUNCTION notify_vendor_new_booking()
RETURNS TRIGGER AS $$
DECLARE
  vendor_user_id uuid;
  listing_title text;
BEGIN
  -- Get vendor user_id and listing title
  SELECT v.user_id, l.title
  INTO vendor_user_id, listing_title
  FROM listings l
  JOIN vendors v ON v.id = l.vendor_id
  WHERE l.id = NEW.listing_id;
  
  -- Create notification for vendor
  PERFORM create_notification(
    vendor_user_id,
    'New Booking Request',
    'You have a new booking request for ' || listing_title,
    'booking'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new booking notifications
CREATE TRIGGER notify_vendor_on_new_booking
  AFTER INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_vendor_new_booking();

-- Function to notify customer of booking status change
CREATE OR REPLACE FUNCTION notify_customer_booking_status()
RETURNS TRIGGER AS $$
DECLARE
  listing_title text;
  status_message text;
BEGIN
  -- Only notify on status change
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;
  
  -- Get listing title
  SELECT title INTO listing_title
  FROM listings
  WHERE id = NEW.listing_id;
  
  -- Create appropriate message based on status
  CASE NEW.status
    WHEN 'confirmed' THEN
      status_message := 'Your booking for ' || listing_title || ' has been confirmed!';
    WHEN 'completed' THEN
      status_message := 'Your booking for ' || listing_title || ' has been completed. Please leave a review.';
    WHEN 'cancelled' THEN
      status_message := 'Your booking for ' || listing_title || ' has been cancelled.';
    ELSE
      status_message := 'Your booking status for ' || listing_title || ' has been updated to ' || NEW.status;
  END CASE;
  
  -- Create notification for customer
  PERFORM create_notification(
    NEW.customer_id,
    'Booking Status Update',
    status_message,
    'booking'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for booking status change notifications
CREATE TRIGGER notify_customer_on_booking_status_change
  AFTER UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_customer_booking_status();

-- Function to get admin statistics
CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS jsonb AS $$
DECLARE
  stats jsonb;
BEGIN
  SELECT jsonb_build_object(
    'totalUsers', (SELECT COUNT(*) FROM users),
    'totalVendors', (SELECT COUNT(*) FROM vendors WHERE approved = true),
    'totalBookings', (SELECT COUNT(*) FROM bookings),
    'totalRevenue', (SELECT COALESCE(SUM(total_amount), 0) FROM bookings WHERE payment_status = 'completed'),
    'pendingApprovals', (SELECT COUNT(*) FROM vendors WHERE approved = false),
    'activeListings', (SELECT COUNT(*) FROM listings WHERE active = true),
    'monthlyGrowth', 15.2,
    'conversionRate', 12.5
  ) INTO stats;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_approved ON vendors(approved);
CREATE INDEX IF NOT EXISTS idx_listings_vendor_id ON listings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(active);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_listing_id ON bookings(listing_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_listing_id ON reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference);