
admin/product/reg 페이지 작성 중 post요청으로 페이지에 값을 받은 후 Product테이블에 상품을 등록하고 이 Product 테이블에 Auto increment 로 생성된 id값을 Stock 에 product_id를 FK로 등록해야 하는데 자동으로 생성되는 값이라 방법을 찾아 봄 



![](https://i.imgur.com/RRkDeXA.png)

![](https://i.imgur.com/Ka0J4k1.png)


![](https://i.imgur.com/FNjUDh5.png)


```java
<insert id="save" parameterType="Product">  
    INSERT INTO PRODUCT(  
       name, price, quantity, weight, thumbnail_name, thumbnail_path,   
       exp, `desc`, state, category_id, storage_type_id, admin_id,   
       quantity_category_id, weight_category_id)   
    VALUES(  
       #{name}, #{price}, #{quantity}, #{weight}, #{thumbnailName}, #{thumbnailPath},  
       #{exp}, #{desc}, #{state}, #{categoryId}, #{storageTypeId}, #{adminId},  
       #{quantityCategoryId}, #{weightCategoryId} )  
  </insert>
```

입력 할때 Auto increment 인 상품의 id를 기입하지 않았고 그렇기 때문에 insert 할때 id값이 들어가 있지도 않음. 하지만 상품등록 시 입력한 재고, 수확일자를 재고 테이블에 등록하기 위해서는 상품의 id가 FK로 필요하기 때문에 다시 받아와야 한다.

```java
//mapper
<insert id="save" parameterType="Product" 
useGeneratedKeys="true" keyProperty="id">  //추가한 부분, id값을 Serviceimp로 보내줌  
    INSERT INTO PRODUCT(  
       name, price, quantity, weight, thumbnail_name, thumbnail_path,   
       exp, `desc`, state, category_id, storage_type_id, admin_id,   
       quantity_category_id, weight_category_id)   
    VALUES(  
       #{name}, #{price}, #{quantity}, #{weight}, #{thumbnailName}, #{thumbnailPath},  
       #{exp}, #{desc}, #{state}, #{categoryId}, #{storageTypeId}, #{adminId},  
       #{quantityCategoryId}, #{weightCategoryId} )  
  </insert>
```

위의 방법으로 Service에 id값을 넘겨 받아 재고 등록까지 되게 하였음.

다른 예제)
```java
//Mapper                                <--------------------------------------->
<insert id="save" parameterType="Order" useGeneratedKeys="true" keyProperty="id">
    insert into `ORDER`(`DATE`, `TYPE`, PRICE, QUANTITY, DETAIL_ID, MEMBER_ID, PRODUCT_ID, LOCATION_ID)  
    VALUES(  
    current_timestamp()  
    ,#{type}  
    ,#{price}  
    ,#{quantity}  
    ,#{detailId}  
    ,#{memberId}  
    ,#{productId}  
    ,#{locationId})  
</insert>

//useGeneratedKeys="true": 이 설정은 데이터베이스가 자동으로 생성한 키를 사용하여 키 값
//을 생성하도록 지시
//keyProperty="id": 이 설정은 자동으로 생성된 키 값을 저장할 Java 객체의 속성을 지정
```

```java
//ServiceImp

@Override  
public long addOrder(Order order) {  
    repository.save(order);  
  
    //Auto increment id값 return으로 Controller로 보내기  
    return order.getId();  
  
}
```

```java
//Controller

long orderId = service.addOrder(order); //auto increment order id 값

```
