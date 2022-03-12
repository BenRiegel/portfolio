# Select Menu Project, Part 2

In the [previous post](select-menu-part-2), I discussed two challenges associated with managing updates from state changes: 1) the updates have to happen in a particular order, 2) the asyncronous update itself involves a state changes (i.e. whether the animation is in progress or not). In this post, I'll discuss my strategy for dealing with these challenges.

For background, let me talk about how I like to manage application state in my apps. I like to use a system that is similar to and inspired by the redux. My implementation is less abstract and more tailored to a particular application. In this system, state properties are managed inside a "store" object. The store has certain methods called "actions" which update the state is specific ways. The store also allows other components of the application to be notified when the state changes.

Normally, when the state changes and other components are notified, these notifications are completed syncronously. To allow for a view update that involves an animation, the notifications need to be asyncronous. The following is a sample notify function that notifies listeners that the state has updated.

~~~js
async function notify(a){
  let listenerList = this.listeners[actionName];
  for (let listener of listenerList){
    await listener();
  }
}
~~~

This notify function is an asyncronous function and we use to await keyword to wait for each callback to finish updating. This will allow each update, syncronous or asyncronous, to be done sequentially. In the previous post, I noted that for the select menu to function as I want it, it's necessary to specify the order in which the notifications happen. The selected option have to update first, then the open state toggles, then the event is broadcasted. There are two ways to do this. First, I could make sure that when the listeners are registered with the store, the registrations happen in the order that I want them. Second, I could make the order explicit. I chose the latter course because making it explicit is easier to understand and maintain. The following code shows the function used to set the notification order for the 'clickAction'.

~~~js
globalStore.setNotificationOrder('clickAction', ['option', 'select', 'emitter']);
~~~

Here the global store is the main application store. When various application components register with the global store to receive notifications about state changes, they have to register an id for the lister. Each option registers with the id 'option.' The select menu registers with the id 'select'. The emitter responsible for broadcasting messages registers with the 'emitter' id. The setNotificationOrder method specifies that when there is a 'clickAction' the options should be notified first, the select menu second, and the emitter third. This is what we want.

The other major challenge has to do with keeping track of when an animation starts and stops. There are two ways to do this. First, I could add an 'animationInProgress' property to the global store. Alternatively, I could create a second store, namely the view store, which manages state changes that pertain to animations. I decided that it made the most sense to create a second store that pertains exclusively to the view. When the global state changes, I didn't want the notifications about the global state changes to further modify the global state. Instead, I allow for notifications about global state changes to modify the view state.

Let's go over again exactly what happens when the user clicks on a new option. First, the 'clickAction' is executed which updates the state. The store realizes the state has changed and that it's a clickAction. It checks to see if there's a notification order for the 'clickAction', which there is. It then goes through the order, notifying the options first, which update the selected option. Next the select menu view is notified, which asyncronously closes the select menu. When this happens, an 'animationStartAction' is executed on the view store, which disables the input controls and notifies listeners that an animation has started. The animation finishes, and then an 'animationEndAction' is executed, which enables the input controls and notifies listeners than an animation has ended. This completes the select menu update from the global store. Finally, listeners are notified that there is a new selected option.

Before this project, I would not have thought that implementing an animating select menu would be this complicated! In the [next post](select-menu-part-3), I'll discuss the differences in implementing the select menu using vanilla JS vs React.
