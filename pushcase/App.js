import React, { useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import OneSignal from 'react-native-onesignal';
import axios from 'axios';

const api = axios.create({
	baseURL: "http://192.168.15.174:3000"
})

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	useEffect(() => {
		// OneSignal Initialization
		OneSignal.setAppId('de46f4f7-94f4-4540-bdd0-a7708f87ae86');

		// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
		// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
		OneSignal.promptForPushNotificationsWithUserResponse();

		//Method for handling notifications received while app in foreground
		OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
			console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
			let notification = notificationReceivedEvent.getNotification();
			console.log("notification: ", notification);
			const data = notification.additionalData
			console.log("additionalData: ", data);
			// Complete with null means don't show a notification.
			notificationReceivedEvent.complete(notification);
		});

		//Method for handling notifications opened
		OneSignal.setNotificationOpenedHandler(notification => {
			console.log("OneSignal: notification opened:", notification);
		});
	}, []);

	const gerarNoti = () => {
		api.get('/pushnoti').then((result) => console.log(result)).catch((error) => {
			if (error.response) {
				console.log(error.response)
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			  }
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity style={styles.btn} onPress={gerarNoti}>
				<Text>Gerar notificação</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		color: "#fff"
	},
	btn: {
		borderColor: 'black',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 5,
		backgroundColor: "#f0f0f0"
	}
});

export default App;
