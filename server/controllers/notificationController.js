const {

    getNotificationsByUser,

    getUnreadCount,

    markNotificationAsRead,

    markAllNotificationsAsRead

} = require("../models/notificationModel");

const getNotifications = async (req,res)=>{

    try{

        const notifications=

            await getNotificationsByUser(

                req.user.id

            );

        return res.status(200).json({

            notifications

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            message:"Internal Server Error"

        });

    }

};

const getUnreadNotificationCount = async (req,res)=>{

    try{

        const count=

            await getUnreadCount(

                req.user.id

            );

        return res.status(200).json({

            count

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            message:"Internal Server Error"

        });

    }

};

const markAsRead = async (req,res)=>{

    try{

        await markNotificationAsRead(

            req.params.id,

            req.user.id

        );

        return res.status(200).json({

            message:"Notification marked as read."

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            message:"Internal Server Error"

        });

    }

};

const markAllAsRead = async (req,res)=>{

    try{

        await markAllNotificationsAsRead(

            req.user.id

        );

        return res.status(200).json({

            message:"All notifications marked as read."

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            message:"Internal Server Error"

        });

    }

};

module.exports={

    getNotifications,

    getUnreadNotificationCount,

    markAsRead,

    markAllAsRead

};