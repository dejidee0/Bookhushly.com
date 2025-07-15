"use strict";exports.id=5440,exports.ids=[5440],exports.modules={95440:(e,r,t)=>{t.d(r,{Km:()=>i,LR:()=>u,N:()=>o,TB:()=>d,X8:()=>l,aL:()=>_,e6:()=>c,i1:()=>m,jy:()=>s,lx:()=>g,pz:()=>p,xv:()=>a});var n=t(46757);let a=async e=>{try{let{data:r,error:t}=await n.O.from("users").insert({id:e.id,email:e.email,name:e.name,role:e.role,created_at:e.created_at||new Date().toISOString(),updated_at:new Date().toISOString()}).select().single();if(t)throw t;return{data:r,error:null}}catch(e){return console.error("Create user profile error:",e),{data:null,error:e}}},i=async e=>{try{let{data:r,error:t}=await n.O.from("vendors").insert({user_id:e.user_id,business_name:e.business_name,business_description:e.business_description,business_address:e.business_address,phone_number:e.phone_number,business_registration_number:e.business_registration_number,tax_identification_number:e.tax_identification_number,bank_account_name:e.bank_account_name,bank_account_number:e.bank_account_number,bank_name:e.bank_name,business_category:e.business_category,years_in_operation:e.years_in_operation,website_url:e.website_url,approved:!1,created_at:new Date().toISOString(),updated_at:new Date().toISOString()}).select().single();if(t)throw t;return{data:r,error:null}}catch(e){return console.error("Create vendor profile error:",e),{data:null,error:e}}},s=async e=>{try{let{data:r,error:t}=await n.O.from("vendors").select(`
        *,
        users (
          name,
          email
        )
      `).eq("user_id",e).single();if(t)throw t;return{data:r,error:null}}catch(e){return console.error("Get vendor profile error:",e),{data:null,error:e}}},o=async(e,r)=>{try{let{data:t,error:a}=await n.O.from("vendors").update(r).eq("id",e).select().single();if(a)throw a;return{data:t,error:null}}catch(e){return{data:null,error:e}}},l=async e=>{try{let{data:r,error:t}=await n.O.from("vendors").select("id").eq("user_id",e.vendor_id).single();if(t)throw t;let{data:a,error:i}=await n.O.from("listings").insert({vendor_id:r.id,title:e.title,description:e.description,category:e.category,price:e.price,location:e.location,capacity:e.capacity,duration:e.duration,availability:e.availability,features:e.features,requirements:e.requirements,cancellation_policy:e.cancellation_policy,media_urls:e.media_urls||[],active:!1!==e.active,created_at:new Date().toISOString(),updated_at:new Date().toISOString()}).select().single();if(i)throw i;return{data:a,error:null}}catch(e){return console.error("Create listing error:",e),{data:null,error:e}}},u=async e=>{try{let{data:r,error:t}=await n.O.from("listings").select(`
        *,
        vendors (
          business_name,
          approved,
          users (
            name,
            email
          )
        )
      `).eq("id",e).single();if(t)throw t;return{data:r,error:null}}catch(e){return{data:null,error:e}}},c=async(e,r)=>{try{let{data:t,error:a}=await n.O.from("listings").update(r).eq("id",e).select(`
        *,
        vendors (
          business_name,
          approved,
          users (
            name,
            email
          )
        )
      `).single();if(a)throw a;return{data:t,error:null}}catch(e){return console.error("Update listing error:",e),{data:null,error:e}}},d=async e=>{try{let{data:r,error:t}=await n.O.from("bookings").insert({listing_id:e.listing_id,customer_id:e.customer_id,booking_date:e.booking_date,booking_time:e.booking_time,guests:e.guests,duration:e.duration,special_requests:e.special_requests,contact_phone:e.contact_phone,contact_email:e.contact_email,total_amount:e.total_amount,status:"pending",payment_status:"pending",created_at:new Date().toISOString(),updated_at:new Date().toISOString()}).select().single();if(t)throw t;return{data:r,error:null}}catch(e){return console.error("Create booking error:",e),{data:null,error:e}}},_=async(e,r)=>{try{if("customer"===r){let{data:r,error:t}=await n.O.from("bookings").select(`
          *,
          listings (
            title,
            category,
            price,
            vendors (
              business_name,
              users (
                name,
                email
              )
            )
          )
        `).eq("customer_id",e).order("created_at",{ascending:!1});if(t)throw t;return{data:r,error:null}}if("vendor"===r){let{data:r}=await n.O.from("vendors").select("id").eq("user_id",e).single();if(!r)return{data:[],error:null};let{data:t,error:a}=await n.O.from("bookings").select(`
          *,
          listings (
            title,
            category,
            price,
            vendors (
              business_name,
              users (
                name,
                email
              )
            )
          )
        `).eq("listings.vendor_id",r.id).order("created_at",{ascending:!1});if(a)throw a;return{data:t,error:null}}return{data:[],error:null}}catch(e){return console.error("Get bookings error:",e),{data:null,error:e}}},m=async(e,r)=>{try{let{data:t,error:a}=await n.O.from("bookings").update({status:r}).eq("id",e).select().single();if(a)throw a;return{data:t,error:null}}catch(e){return{data:null,error:e}}},g=async e=>{try{let{data:r,error:t}=await n.O.from("bookings").select(`
        *,
        listings (
          title,
          category,
          price,
          vendors (
            business_name,
            users (
              name,
              email
            )
          )
        )
      `).eq("id",e).single();if(t)throw t;return{data:r,error:null}}catch(e){return{data:null,error:e}}},p=async(e,r,t=null)=>{try{let a={payment_status:r,updated_at:new Date().toISOString()};t&&(a.payment_reference=t),"completed"===r&&(a.status="confirmed");let{data:i,error:s}=await n.O.from("bookings").update(a).eq("id",e).select().single();if(s)throw s;return{data:i,error:null}}catch(e){return{data:null,error:e}}}}};