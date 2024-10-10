import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery} from "urql";
import { CreateNewPlaylsit, currentUserPlaylist, AddVideoToPlaylist } from "@/gqlClient/Playlist";
import { currentUserPlaylistResponse } from "@/types";
export function SaveToPlaylistDialog({videoId}:{videoId:string}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [{ data, fetching, error }] = useQuery<currentUserPlaylistResponse>({ query: currentUserPlaylist });
  const items = data?.getCurrentUserPlaylists;
  if (error) return <div>Error: {error.message}</div>;

const [result,createPlaylist] = useMutation(CreateNewPlaylsit);
  const [_,addVideo] = useMutation(AddVideoToPlaylist)

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPlaylist({
          input: {
            title,
            description,
            videoId,
          },
      });

      setTitle("");
      setDescription("");
      setLoading(false);
    } catch (error) {
      console.error("Error creating playlist:", error);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Save</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Video to Playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="playlistTitle">Playlist Title</label>
              <Input
                id="playlistTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="playlistDescription">Playlist Description</label>
              <Input
                id="playlistDescription"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Playlist"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
