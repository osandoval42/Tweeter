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
		this.head.next = tail;
		this.tail.prev = head;
		this.length = 0;
	}
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
		fn(currNode.val);
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
	next.prev = firstNeighbor;
}

LimitLessLRUCache.prototype.insertNewestNodeYet = function(key, val){
	let newNode;
	if (this.val(key) === undefined){
		newNode = this.createNewNode(key, val);
	} else {
		let nodeToChange = this.map[key];
		nodeToChange.val = val;
		const outdatedPrev = nodeToChange.prev;
		const outdatedNext = nodeToChange.next;
		joinNodes(outdatedPrev, outdatedNext);
		newNode = nodeToChange;
	}

	let afterHead = this.head.next;
	joinNodes(this.head, newNode);
	joinNodes(newNode, afterHead);
}

LimitLessLRUCache.prototype.insertOldestNodeYet = function(key, val){
	if (this.val(key) === undefined){
		let newNode = this.createNewNode(key, val);
		let beforeTail = this.tail.prev;
		joinNodes(beforeTail, newNode);
		joinNodes(newNode, this.tail);
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
	this.forEach((node) => {
		let valDuped = merge({}, node.val);
		let dupedNode = new Node(node.key, valDuped);
		dup.insertOldestNodeYet(node.key, dupedNode);
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