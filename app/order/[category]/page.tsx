
export default async function page({ params }: { params: { category: string } }) {
  const resolvedParams = await params;
  
  return <div>Category: {resolvedParams.category}</div>;

}
