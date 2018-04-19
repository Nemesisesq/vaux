import PropTypes from "prop-types";

export const Message = PropTypes.shape({
   _id: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
   createdAt: PropTypes.instanceOf(Date).isRequired,
   user: {
      _id: PropTypes.number.isRequired,
      name: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired
   }
});

export const Thread = PropTypes.shape({
   id: PropTypes.string.isRequired,
   imageURL: PropTypes.string.isRequired,
   lastMessageAt: PropTypes.instanceOf(Date).isRequired,
   name: PropTypes.string.isRequired,
   new: PropTypes.bool.isRequired,
   messageSnippet: PropTypes.string.isRequired
});
