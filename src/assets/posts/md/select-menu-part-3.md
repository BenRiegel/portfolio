# Select Menu Project, Part 3

This is the third post in a three-part series about creating a custom, animating select menu. The [first post](select-menu-part-1) outlined the project and the challenges associated with asyncronous view updates. The [second post](select-menu-part-2) discussed my approach for overcoming these challenges. This post discusses the differences in implementing the custom select menu in vanilla JS and React.

When I first began the project, I anticipated that there might be big differences between the two versions. In fact, however, the differences were relatively small. The reason is that in React, the built-in state management system can't do the things that I needed it to do. In React, when a component state updates, all the updates are done syncronously. There is no way (to the best of my knowledge) to have the updates be asyncronous or in a particular order. To make the animating select menu work in React, I had to bypass the built-in state management system and implement a redux-style alternative system, which was nearly identical to that used in the vanilla JS version (see the second post in this series about state management in the vanilla JS version).

While the built-in state management system in React wasn't used for the heavy lifting, it was used to make basic changes to the DOM. For instance, each option component had a state variable that corresponded to whether it was selected or not. If the global state was updated in such a way that a particular option became selected, the component's state property was assigned to true and a "selected" class was added to the option's root DOM element. React nicely takes care of the DOM updates whenever the component state changes.

In the vanilla JS version, I had to implement the DOM updates myself. In doing this, I used the following approach. For each select menu element and option element, I created an instance of a "Node" class. This class creates a DOM element and has methods for performing various actions on it (e.g. adding a class, setting a data property, etc.). The node object also allows the author to create what I call "observed variable attributes." These represent DOM attributes, such as a class name, that might change during the application. In creating an observed variable attribute, the author defines a "valueCalculator" method, which specifies how the value of the attribute is calculated. When the state updates, the valueCalculator function is called to determine a new value for the attribute. If the new value is different from the old value, then the DOM element's attribute is updated. The author does not need to specify how the DOM changes are made. This is an implementation detail internal to the Node class. All the author has to do is specify the value calculator. If an animation is supposed to happen, the author can also define an "isAnimatingCalculator" function. If the value needs updating, the isAnimatingCalculator function is executed prior to the update. If it returns true, then the DOM change is made and it waits for an animation to complete.

The following is code that creates an open state data attribute for the select node:

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

The new variable attribute is a data attribute (i.e. it corresponds to a property on the node's dataset object). The name of the data attribute is "state." The valueCalculator function specifies that when the global store updates, the value of the variable attribute is set to the value of the global store's openState property. If the value of the open state data attribute changes, then the DOM is updated. Furthermore, the isAnimatingCalculator function specifies that an animation should occur when the view store's animationsEnabled flag is set to true.

Using this "observed variable attribute" pattern is my attempt to create code that is more declarative (rather than imperative) in style. All the author has to do is specify what the value of a particular data attribute should be and when it should be animated. The implementation details of the DOM changes are taken care of internally. It's definitely not as robust as the React framework, but it can more easily accommodate attribute changes that are animated. The major downside was that I had to implement the "Node" class from scratch. Overall, I would say that the vanilla JS version of the select menu was just as easy to use, at least for this application, as the React version. Moreover, the vanilla JS version involved a lot less overhead code than the React version. This is why I like coding using vanilla JS.
