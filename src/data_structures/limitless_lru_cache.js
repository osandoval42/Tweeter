/*
	insertNewestNodeYet(key, value) -> Checks in map if key already exists.
	If so{
		change val at node for given key to the new val.
		move node to top of linked list
	} else {
		create node with new val.  
		set key in map to it
		put node at top of linked list
	} CHECK

	insertOldestNodeYet(key, value) -> Checks in map if key already exists
	If NOT {
		createNodeWithNewVal
		Set keyInMapTOIt
		put node at bottom of list
	} CHECK

	val(key) -> looks up node at key.  If node exists returns val at node, else returns undefined CHECK
	
	LimitLessLRUCache has map CHECK

	has head node CHECK
	
	map(fn){
		ret = []
		set currNode to head.next
		while (currNode){
			ret.push(fn(currNode.val))
			currNode = currNode.next
		}
	}
*/

import merge from 'lodash/merge';

class LimitLessLRUCache{
	constructor(){
		this.keys = {};
		this.head = new Node();
		this.tail = new Node();
		this.head.next = this.tail;
		this.tail.prev = this.head;
		this.length = 0;
	}
}

LimitLessLRUCache.prototype.first = function(){
	const firstNode = this.head.next;
	return (firstNode === this.tail) ? undefined : firstNode.val;
}

LimitLessLRUCache.prototype.map = function(fn){
	let ret = [];
	let currNode = this.head.next;
	while (currNode != this.tail){
		ret.push(fn(currNode.val));
		currNode = currNode.next;
	}
	return ret;
}

LimitLessLRUCache.prototype.forEach = function(fn){
	let currNode = this.head.next;
	while (currNode != this.tail){
		fn(currNode.key, currNode.val);
		currNode = currNode.next;
	}
}

LimitLessLRUCache.prototype.val = function(key) {
	const node = this.keys[key]
	if (!node) {return undefined;}
	return node.val;
}

LimitLessLRUCache.prototype.joinNodes = function(prev, next){
	prev.next = next;
	next.prev = prev;
}

LimitLessLRUCache.prototype.insertNewestNodeYet = function(key, val){
	let newNode;
	if (this.val(key) === undefined){
		newNode = this.createNewNode(key, val);
	} else {
		let nodeToChange = this.keys[key];
		nodeToChange.val = val;
		const outdatedPrev = nodeToChange.prev;
		const outdatedNext = nodeToChange.next;
		this.joinNodes(outdatedPrev, outdatedNext);
		newNode = nodeToChange;
	}

	let afterHead = this.head.next;
	this.joinNodes(this.head, newNode);
	this.joinNodes(newNode, afterHead);
}

LimitLessLRUCache.prototype.updateNode = function(key, val){
	if (this.keys[key]){
		this.keys[key].val = val;
	}
}

LimitLessLRUCache.prototype.insertOldestNodeYet = function(key, val){
	if (this.val(key) === undefined){
		let newNode = this.createNewNode(key, val);
		let beforeTail = this.tail.prev;
		this.joinNodes(beforeTail, newNode);
		this.joinNodes(newNode, this.tail);
	}
}

LimitLessLRUCache.prototype.createNewNode = function(key, val){
	this.length++;
	const newNode = new Node(key, val);
	this.keys[key] = newNode;
	return newNode;
}

LimitLessLRUCache.prototype.dup = function(){ //assumes object val and primitive key
	let dup = new LimitLessLRUCache();
	this.forEach((key, val) => {
		let valDuped = merge({}, val);
		dup.insertOldestNodeYet(key, valDuped);
	})
	return dup;
}

class Node{
	constructor(key, val){
		this.val = val;
		this.key = key;
		this.next = undefined;
		this.prev = undefined;
	}
}


export default LimitLessLRUCache;