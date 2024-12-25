import History from "@/app/components/dashboard/History";

export default function AddressPage({
  params,
}: {
  params: { address: string };
}) {
  return <History params={params} />;
}
