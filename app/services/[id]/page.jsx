import ServiceDetailClient from './service-detail-content'

// This must be a server component to export generateStaticParams
export async function generateStaticParams() {
  // Generate static paths for service IDs 1-20
  const serviceIds = Array.from({ length: 20 }, (_, i) => ({ 
    id: (i + 1).toString() 
  }))
  return serviceIds
}

export default function ServiceDetailPage({ params }) {
  return <ServiceDetailClient serviceId={params.id} />
}