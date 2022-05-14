
export default {
	state: {
		notifications: []
	},
	getters: {
		getNotifications: state => {
			return state.notifications;
		},
		 
	},
	actions: { 
		addNotification: ({commit}, notification) => { 
			commit("PushNotification", notification);
		},
		removeNotification: ({commit}, notification) => {
			commit("RemoveNotification", notification);
		}
	},
	mutations: {
		PushNotification: (state, notification) => {
			state.notifications.push({
				...notification,
				id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
			})
		},
		RemoveNotification: (state, notificationRemove) => {
			state.notifications = state.notifications.filter(notification => {
				return notification.id != notificationRemove.id;
			})
		}
	}
}