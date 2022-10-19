module.exports = {
    format_date: (date) => {
      if (!date) return 
      // format to local date string
      return date.toLocaleDateString();
    },
    is_even: (num) => {
      if (num % 2 == 0) {
        return true;
      }
    },
    is_odd: (num) => {
      if (num % 2 != 0) {
        return true;
      }
    },
    make_substring: (str) => {
      if (str.length > 100) return `${str.substring(0, 100)}...`;
      return str;
    },
    upper_case: (str) => {
      return str.toUpperCase();
    },
    user_match: (id, id2) => {
      if (id === id2) {
        return true;
      }
    },
  };
  