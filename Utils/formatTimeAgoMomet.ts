import moment from "moment";

const formatTime = (createdAt: number) => {
    const now = moment();
    const announcementTime = moment(createdAt);
    const diffInMinutes = now.diff(announcementTime, "minutes");
    const diffInHours = now.diff(announcementTime, "hours");
    const diffInDays = now.diff(announcementTime, "days");

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else {
        return `${diffInDays} days ago`;
    }
};


export default formatTime;