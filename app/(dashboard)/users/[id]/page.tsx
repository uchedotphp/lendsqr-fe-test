import { UserDetailsView } from "@/app/(dashboard)/users/_components/user-details-view";

type UserDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailsPage({ params }: UserDetailPageProps) {
  const { id } = await params;

  return <UserDetailsView userId={id} />;
}
