import PropTypes from "prop-types";

// TODO: This component still assumes the OLD flat response shape.
// Fix it to read the nested Prisma include response from the API:
//   thread.author?.name
//   thread.author?.avatarUrl
//   thread._count?.comments
// Also add fallback UI so author-less seeded rows do not crash.
export default function ThreadItem({ thread }) {
  const authorName = thread.author?.name ?? "Unknown";
  const authorAvatar = thread.author?. avatarUrl?? "/placeholder-avatar.svg" ;
  const commentCount = thread._count?.comments?? 0;
  return (
    <li className="thread">
      <div className="thread-top">
        <img className="avatar" src={authorAvatar} alt={authorName} />

        <div className="thread-main">
          <h3>{thread.title}</h3>
          <p className="meta">by {authorName}</p>
        </div>

        <span className="badge">{commentCount} replies</span>
      </div>

      <p>{thread.body}</p>
      
    </li>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
    
    _count: PropTypes.shape({
     comment:PropTypes.number,
    })
  }).isRequired,
};
