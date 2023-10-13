class OutOfBoundsException(Exception):
    pass

class LinkedListNode(object):
    def __init__(self, value, next=None):
        self._value = value
        self._next = next

    @property
    def value(self):
        return self._value

    @property
    def next(self):
        return self._next

    @next.setter
    def next(self, node):
        self._next = node

    def hasNext(self):
        return self._next is not None


class LinkedList(object):
    def __init__(self):
        self._head = None
        self._tail = None
        self._len = 0

    def __len__(self):
        return self._len

    @property
    def head(self):
        return self._head.value if self._head else None

    @property
    def tail(self):
        return self._tail.value if self._tail else None

    def append(self, value):
        self._len += 1
        if not self._head:
            self._head = LinkedListNode(value)
            self._tail = self._head
        else:
            self._tail.next = LinkedListNode(value)
            self._tail = self._tail.next

    def insert(self, value):
        self._len += 1
        if not self._head:
            self._head = LinkedListNode(value)
            self._tail = self._head
        else:
            self._head = LinkedListNode(value, self._head)

    def removeFirst(self):
        if not self._head:
            raise OutOfBoundsException
        self._len -= 1
        value = self._head.value
        self._head = self._head.next
        return value

    def getValueAt(self, index):
        if index >= self._len:
            raise OutOfBoundsException
        node = self._head
        for i in range(index):
            node = node.next
        return node.value

    def toList(self):
        node = self._head
        lst = []
        while node:
            lst.append(node.value)
            node = node.next
        return lst


if __name__ == "__main__":
    ll = LinkedList()
    assert ll.head is None
    assert ll.tail is None
    assert ll.toList() == []
    ll.append(1)
    assert ll.head == 1
    assert ll.tail == 1
    assert len(ll) == 1
    assert ll.toList() == [1]
    ll.append(2)
    assert ll.head == 1
    assert ll.tail == 2
    assert len(ll) == 2
    assert ll.toList() == [1, 2]
    ll.append(3)
    assert ll.head == 1
    assert ll.tail == 3
    assert len(ll) == 3
    assert ll.toList() == [1, 2, 3]
    ll.insert(0)
    assert ll.head == 0
    assert ll.tail == 3
    assert len(ll) == 4
    assert ll.toList() == [0, 1, 2, 3]
    ll.insert(-1)
    assert ll.toList() == [-1, 0, 1, 2, 3]
    v = ll.removeFirst()
    assert v == -1
    assert ll.toList() == [0, 1, 2, 3]
    v = ll.removeFirst()
    assert v == 0
    assert ll.toList() == [1, 2, 3]
    v = ll.removeFirst()
    assert v == 1
    assert ll.toList() == [2, 3]
    v = ll.removeFirst()
    assert v == 2
    assert ll.toList() == [3]
    v = ll.removeFirst()
    assert v == 3
    assert ll.toList() == []
    assert len(ll) == 0
    print("100%")