import React, { useState } from "react";

type Comment = {
  id: number;
  user: string;
  content: string;
};

type CommentsSectionProps = {
  videoId: string;
};

export const CommentsSection: React.FC<CommentsSectionProps> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: "User 1", content: "Great video!" },
    { id: 2, user: "User 2", content: "Thanks for sharing!" },
  ]);

  const [newComment, setNewComment] = useState<string>("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, user: "Current User", content: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-2">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user)}`}
              alt={comment.user} 
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-semibold">{comment.user}</p>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border p-2 rounded"
          rows={3}
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
