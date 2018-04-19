import PropTypes from "prop-types";
import moment from "moment";

export const Message = PropTypes.shape({
   id: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
   date: PropTypes.instanceOf(moment).isRequired
});

export const Thread = PropTypes.shape({
   id: PropTypes.string.isRequired,
   imageURL: PropTypes.string.isRequired,
   date: PropTypes.instanceOf(moment).isRequired,
   messages: PropTypes.arrayOf(Message).isRequired,
   name: PropTypes.string.isRequired
});
