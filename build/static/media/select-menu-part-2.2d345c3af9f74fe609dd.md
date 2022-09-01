# Select Menu Project, Part 2

In the [previous post](select-menu-part-2), I discussed two challenges associated with building a custom, animating select menu: 1) updates that result from state changes have to happen asyncronously and in a particular order, and 2) an asyncronous update itself may involve a state change (i.e. an animation starting or stopping). In this post, I'll discuss my strategy for dealing with these challenges.

For background, let me first talk about how I like to manage application state in my apps. I like to use a system that is similar to and inspired by the [redux](https://redux.js.org/). My implementation is less abstract and more tailored to a particular application. In my system, state properties are managed inside a "store" object. The store has certain methods called "actions" which update the state in specific ways. When the state changes, the store notifies other parts of the application, which update their components.

Normally, when the state changes and other components are notified, these notifications are completed syncronously. To allow for a view update that involves an animation, the notifications need to be asyncronous. The following is a sample notify function that notifies listeners that the state has updated. When a particular action occurs, it retrieves the listeners for that particular event and executes them.

~~~js
async function notify(){
  for (let listener of listenerList){
    await listener();
  }
}
~~~

This notify function is an asyncronous function and we use to await keyword to wait for each callback to finish updating. This will allow each update, syncronous or asyncronous, to be done sequentially. In the previous post, I noted that for the select menu to function as intended, it's necessary to specify the order in which the notifications happen. The selected option has to update first, then the open state toggles, and finally the event is broadcasted. There are two ways to implement the ordered notifications. First, I could make sure that when the listeners are registered with the store, the registrations happen in the order that I want them. Second, I could make the order explicit. I chose the latter course because making it explicit is easier to understand and maintain. The following code shows the function used to set the notification order for the 'clickAction':

~~~js
globalStore.setNotificationOrder('clickAction', ['option', 'select', 'emitter']);
~~~

Here the global store is the main application store. The setNotificationOrder function accepts an action name and an array of listener types. This function specifies that when there is a 'clickAction' event, the 'option' type listeners should be notified first, then the 'select' type listeners, and then the 'emitter' listeners. When various application components register with the global store to receive notifications about state changes, they have to register the type of the listener. Each option registers with the 'option' type. The select menu registers with the 'select' type. The emitter responsible for broadcasting messages registers with the 'emitter' type. Whenever there is a 'clickAction', the store retrieves the notification order for that event. For each type in the list, the store retrieves the listeners of that type and executes them asyncronously. This results in the desired behavior: when the state changes, listeners are notified asyncronously and in the desired order.

The other major challenge has to do with keeping track of when an animation starts and stops. To do this, we need a new state property (say, 'animationInProgress'). Where should it go? One possibility is to add it to the state in the global store. Alternatively, I could create a second store, namely the view store, which manages state changes that pertain to animations. I decided that it made the more sense to create a second store that pertains exclusively to the view. When the global state changes, I didn't want the view updates to further modify the global state. It's OK, however, for view updates from global state changes to modify the view state.

Let's go over again exactly what happens when the user clicks on a new option. First, the 'clickAction' is executed which updates the global state. The global store realizes the state has changed and that it's a clickAction. It checks to see if there's a notification order for the 'clickAction', which there is. It then goes through the order, notifying the options first, which update the selected option. Next the select menu view is notified, which asyncronously closes the select menu. When this happens, an 'animationStartAction' is executed on the view store, which disables the input controls and notifies listeners that an animation has started. The animation eventually finishes, and then an 'animationEndAction' is executed, which enables the input controls and notifies listeners than an animation has ended. This completes the select menu update from the global store. Finally, listeners are notified that there is a new selected option.

Before this project, I would not have thought that implementing an animating select menu would be this complicated! In the [next post](select-menu-part-3), I'll discuss the differences in implementing the select menu using vanilla JS vs React.
