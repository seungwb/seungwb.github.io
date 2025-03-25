---
tags:
  - "#JavaMid"
---

- 객체가 자신을 반환하여 연속적으로 메서드를 호출할 수 있도록 설계된 방식
```java
public class ValueAdder {  
  
    private int value;  
  
    public ValueAdder add(int addValue) {  
        value += addValue;  
        return this;  
    }  
  
    public int getValue() {  
        return value;  
    }  
}
```

- 위의 코드에서 보면 `add()` 메서드가 매개변수로 받은 값을 더하여 객체 자식을 반환하는 것을 볼수 있다.

```java
public class MethodChainingMain3 {  
  
    public static void main(String[] args) {  
        ValueAdder adder = new ValueAdder();  
        int result = adder.add(1).add(2).add(3).getValue();  //메서드 체이닝
        System.out.println("result = " + result);  
    }  
}
```

- 위의 코드를 활용하면 메서드 체이닝 기법을 사용할 수 있다.