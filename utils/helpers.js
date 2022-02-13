//handlebar.js helpers here (only need date helper for this app)
module.exports = {
    //format date into MM/DD/YYYY format via Date object
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear}`;
    }
};