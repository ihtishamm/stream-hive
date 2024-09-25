import React, { useState } from "react";
import moment from "moment";
import { useQuery } from "urql";
import { videoComments } from "@/gqlClient/Video";
import { videoCommentsResponse } from "@/types";

export const CommentsSection = ({ videoId }: { videoId: string }) => {
  // State for handling new comments
  const [newComment, setNewComment] = useState("");

  // Fetch comments data
  const [{ data, fetching, error }] = useQuery<videoCommentsResponse>({
    query: videoComments,
    variables: { videoId },
  });

  // Handle comment submission
  const handleCommentSubmit = () => {
    console.log("hi there");
    // Additional logic to submit the comment can be added here
  };

  // Show loading state
  if (fetching) return <p>Loading comments...</p>;
  // Show error state
  if (error) return <p>Error loading comments.</p>;

  // Extract comments from the fetched data
  const comments = data?.getVideoComments || [];

  return (
    <div className="py-5 lg:px-4">
      <div className="flex space-x-3 rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="min-w-0 flex-1 space-y-3">
          {/* Comments Header */}
          <p className="block text-sm font-medium leading-6 text-gray-900">
            {comments.length} Comments
          </p>

          {/* Add Comment Section */}
          <div className="flex items-start gap-2 mb-6">
            <img
              src={`https://ui-avatars.com/api/?name=Current+User`}
              alt="Current User"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full border p-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleCommentSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="my-6">
                <div className="flex gap-2">
                  <img
                    src={comment?.user?.image ?? ""}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{comment.user.name}</p>
                      <p className="text-gray-600 text-sm">
                        {moment(Number(comment.createdAt)).fromNow()}
                      </p>
                    </div>
                    <p className="text-gray-700">{comment.message}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
