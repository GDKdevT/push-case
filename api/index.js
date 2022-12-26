const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const OneSignal = require('@onesignal/node-onesignal');

const user_key_provider = {
    getToken() {
        return  "OGFmYzQxZjEtYzAyNS00NDJkLTg5ZGUtOWNiZjZhZGI3ZWJk";
    }
};

const app_key_provider = {
    getToken() {
        return "NTFmNzIxZTctYTYwOC00YTEwLWE5YzUtN2UwNmZkMTM4Nzli";
    }
};

let configuration = OneSignal.createConfiguration({
    authMethods: {
        user_key: {
            tokenProvider: user_key_provider
        },
        app_key: {
            tokenProvider: app_key_provider
        }
    }
});

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/pushnoti', async (req, res) => {
    console.log("push-Noti")
    const client = new OneSignal.DefaultApi(configuration);
    const osapp = await client.getApp('de46f4f7-94f4-4540-bdd0-a7708f87ae86');
    const notification = new OneSignal.Notification();
    notification.app_id = osapp.id;
    notification.included_segments = ['Subscribed Users'],
    notification.contents = {
    en: "Trigger back-end"
    }

    // required for Huawei
    notification.headings = {
    en: "Back-end noti"
    }
    const result = await client.createNotification(notification);
    return res.status(200).json({
        client,
        osapp,
        notification,
        result
    })
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));