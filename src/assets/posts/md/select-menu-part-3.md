# Select Menu Project, Part 3

This is the third post in a three-part series about creating a custom select menu. The [first post](select-menu-part-1) outlined the project and the challenges associated with asyncronous view updates. The [second post](select-menu-part-2) discussed my approach for overcoming this challenge. This post discusses the differences in implementing the select menu widget in both vanilla JS and React.

When I first begun the project, I anticipated that there might be big differences between the two versions. In fact, however, the differences were relatively small. The reason is that in React, the built-in state management system can't do the things that I needed it to do. When the state updates, all the components that depend on the state update syncronously. There is no way (to the best of my knowledge) to have the updates by asyncronous or in a particular order. Thus, to make the animating select menu widget work in React, you have to bypass the built-in state management system. You have to implement an alternative system.

For both the vanilla JS version and the React version, I ended up using a very similar system for state management. As discussed in the previous post, this involves the use of stores, which manage the application state, and actions that modify the state. Components register listeners for updates about state changes and modify their respective views accordingly. All the state-management heaving lifting was done externally to React. The built-in state management system was used only to keep track of certain dom attributes. For instance, each option component had a state variable that corresponded to whether it was selected or not. If the state was updated to indicate that an option was selected, the component added the 'selected' class to the option's root dom node.

In the vanilla JS version, I used the following approach for DOM updates. For each select menu element and option element, I created a "node" object. This object creates a dom element and has methods for performing various actions on it (e.g. adding a class, setting a data property, etc.). The node object allows allows the author to create what I call "observed variable attributes." For example, the author can create a class variable attribute. This object allows the author to create a "valueCalculator" method, which specifies how the value of the class attribute is calculated. The node object can subscribe to store updates, and when the state updates, the "valueCalculator" function is called to determine a new value for the attribute. If the new value is different from the old value, then the DOM element's class list is updated. The author does not need to specify how the dom changes are made. This is an implementation detail in the Node class. All the author has to do is specify the value calculator. If an animation is supposed to happen, the author can also specify and "isAnimatingCalculator." If the value needs updating, the animatingCalculator function is executed. If it returns true, then the DOM change is made and it waits for an animation to complete. The following is code that creates an open state data attribute for the select node.

~~~js
let openStateDataAttr = selectNode.createNewVarAttr({
  type: 'data',
  name: 'state',
  valueCalculator: function(){
    return globalStore.openState;
  },
  isAnimatingCalculator: function(){
    return viewStore.animationsEnabled;
  },
});
~~~

The new variable attribute is a data attribute (i.e. it corresponds to a property on the node's dataset object). The name of the data attribute is 'state.' The valueCalculator function specifies that when the global store updates, the value of the variable attribute is set to the value of the global store's openState property. If the value of open state data attribute changes, then the dom is updated. Furthermore, the isAnimatingCalculator function specifies that an animation should occur when the view store's animationsEnabled flag is set to true.

Using this "observed variable attribute" pattern is my attempt to create more declarative view changes. All the author has to do is specified when the class should be applicable. The implementation details of the DOM changes are abstracted away. It's definitely not as robust as the React framework, but it still is easy to use and doesn't involve a lot of overhead code.
