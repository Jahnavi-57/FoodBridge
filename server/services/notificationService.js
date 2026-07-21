const notifyNearbyReceivers = async (donation) => {


    console.log(
        `Notification service triggered for donation: ${donation.food_name}`
    );

};

module.exports = {
    notifyNearbyReceivers
};