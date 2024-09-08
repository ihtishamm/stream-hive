// components/CommunitySection.tsx
import { userAnnoucements, createAnnouncement } from "@/gqlClient/Announcement";
import { useMutation, useQuery } from "urql";
import { me } from "@/gqlClient/user";

import AnnouncementItem from "./AnnouncementsItem";
import CreateAnnouncementForm from "./CreateAnnouncement";
import { UserAnnouncementsResponse } from "@/types"

const CommunitySection = ({ userId }: { userId: string }) => {
  const [{ data, fetching, error }, replay] = useQuery<UserAnnouncementsResponse>({
    query: userAnnoucements,
    variables: { userid: userId },
  });

  const [{ data: meData, error: meError }] = useQuery({
    query: me,
  });

  const currentUserId = meData?.me?.id;

  const [result, createNewAnnouncement] = useMutation(createAnnouncement);
  const { fetching: isPosting } = result;

  const handlePost = async (message: string) => {
    try {
      const result = await createNewAnnouncement({ input: { message } });
      if (result.data) {
        await replay({ requestPolicy: 'network-only' });
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error fetching announcements</p>;

  return (
    <div className="p-6">
      {currentUserId === userId && (
        <CreateAnnouncementForm onPost={handlePost} isPosting={isPosting} />
      )}
      {data?.getUserAnnouncements?.length ?? 0 > 0 ? (
        <ul role="list" className="space-y-4">
          {data?.getUserAnnouncements?.map((announcement) => (
            <AnnouncementItem key={announcement.id} announcement={announcement} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No announcements available.</p>
      )}
    </div>
  );
};

export default CommunitySection;
