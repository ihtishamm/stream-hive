import { useState, useEffect } from 'react';
import { userAnnoucements, createAnnouncement } from "@/gqlClient/Announcement";
import { useMutation, useQuery } from "urql";
import { me } from "@/gqlClient/user";
import AnnouncementItem from "./AnnouncementsItem";
import CreateAnnouncementForm from "./CreateAnnouncement";
import { UserAnnouncementsResponse } from "@/types";
import Spinner from "./Spinner";
import { AnnouncementSkeleton } from "./skeltions/AnnoucementSkelton";

const CommunitySection = ({ userId, currentUser }: { userId: string, currentUser: string }) => {
  const [{ data, fetching, error }, replay] = useQuery<UserAnnouncementsResponse>({
    query: userAnnoucements,
    variables: { userid: userId },
  });

  const [result, createNewAnnouncement] = useMutation(createAnnouncement);
  const { fetching: isPosting } = result;

  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

  useEffect(() => {
    if (!fetching && !initialFetchComplete) {
      setInitialFetchComplete(true);
    }
  }, [fetching, initialFetchComplete]);

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

  const handleEdit = async () => {
    await replay({ requestPolicy: "network-only" });
  };

  const handleDelete = async () => {
    await replay({ requestPolicy: "network-only" });
  };

  if (error) return <p>Error fetching announcements</p>;
  if (!initialFetchComplete) {
    return (
      <div className="space-y-4">
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6">
      {currentUser === userId && (
        isPosting ? <div className="mb-4"> <Spinner />  </div> :
          <CreateAnnouncementForm onPost={handlePost} isPosting={isPosting} />
      )}

      {data?.getUserAnnouncements?.length ?? 0 > 0 ? (
        <ul role="list" className="space-y-4">
          {data?.getUserAnnouncements?.map((announcement) => (
            <AnnouncementItem key={announcement.id} announcement={announcement}
              currentUserId={currentUser}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No announcements available.</p>
      )}
    </div>
  );
};

export default CommunitySection;
