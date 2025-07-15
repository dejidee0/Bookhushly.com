import BookServiceClient from "../../../components/book/BookServiceClient";

export async function generateStaticParams() {
  const serviceIds = Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
  return serviceIds;
}

export default function BookServicePageWrapper() {
  return <BookServiceClient />;
}
