import PropTypes from "prop-types";

export const Sound = PropTypes.shape({
   module: PropTypes.number.isRequired,
   name: PropTypes.string.isRequired,
   color: PropTypes.string.isRequired
});

export const Message = PropTypes.shape({
   _id: PropTypes.string.isRequired,
   text: PropTypes.string,
   image: PropTypes.string,
   createdAt: PropTypes.instanceOf(Date).isRequired,
   sound: Sound,
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
   new: PropTypes.bool.isRequired
});
