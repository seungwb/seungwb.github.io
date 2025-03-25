---
tags:
  - "#GinongIssueFront"
  - "#html"
  - "#Javascript"
  - "#css"
---

옵션을 선택하여 선택한 데이터를 post요청에 담아 controller로 보내기 위해 selector 구문을 사용하기로 했지만 옵션 hover 시 파란색으로 고정되어 있음.

```html
<div class="n-select"> 
	<select name="pets" id="pet-select"> 
		<option value="">Please choose an option</option> 
		<option value="dog">Dog</option> 
		<option value="cat">Cat</option> 
		<option value="hamster">Hamster</option> 
	</select> 
</div>
```
일반적인 selector로 손쉽게 사용 가능하지만 hover시 파란색인 것을 수정 할 수 없었음. 
```css
//css 
option:hover {
  background-color: red;
}

```
해당 구문을 css에 사용 시 간단하게 색 지정이 가능하나 현재는 파이썬에서만 작동하고 크롬에서 작동하지 않아 여러 방법을 찾아보게 됨.


```html
//html
<div class="custom-dropdown">  
    <div class="selected-option deco deco-pos:right icon:RT deco-size:1 deco-color:main-6" id="selectedOptionCategory">카테고리 선택</div>  
    <ul class="options">  
        <li class="option" data-value="1">과채</li>  
        <li class="option" data-value="2">앙념</li>  
        <li class="option" data-value="3">가공식품</li>  
    </ul>  
</div>
<input type="hidden" id="selectedCategory" name="categoryId" value="1">
```
```js
//JavaScript
document.addEventListener("DOMContentLoaded", function() {  
    var selectedOption = document.getElementById('selectedOptionCategory');  
    var options = document.querySelectorAll('.option');  
    var selectedCategoryInput = document.getElementById('selectedCategory');  
  
    selectedOption.addEventListener('click', function() {  
        var optionList = this.nextElementSibling;  
        optionList.style.display = (optionList.style.display === 'block') ? 'none' : 'block';  
    });  
  
    options.forEach(function(option) {  
        option.addEventListener('click', function() {  
            var selectedValueCategory = this.getAttribute('data-value');  
            selectedOption.textContent = this.textContent;  
            selectedCategoryInput.value = selectedValueCategory; // hidden input에 선택된 값을 설정  
            this.parentNode.style.display = 'none';  
        });  
    });  
  
    // 드롭다운 닫기  
    document.addEventListener('click', function(event) {  
        if (!selectedOption.contains(event.target)) {  
            options.forEach(function(option) {  
                option.parentNode.style.display = 'none';  
            });  
        }  
    });  
});
```

```css
//css
.custom-dropdown {  
    position: relative;  
    display: inline-block;  
}  
/*처음 클릭하는 곳 스타일링*/  
.selected-option {  
    background-color: #ffffff;  
    padding: 8px 16px;  
    border: 1px solid var(--color-main-5);  
    border-radius: 5px;  
    cursor: pointer;  
    width: 250px;  
    height : 40px;  
    display: flex;  
    align-items: center;  
    justify-content: space-between;  
}  
/*메뉴 고르는곳 스타일링*/  
.options {  
    position: absolute;  
    list-style-type: none;  
    padding: 0;  
    margin: 0;  
    background-color: #ffffff;  
    border: 1px solid var(--color-main-5);  
    border-top: none;  
    border-radius: 5px;  
    display: none;  
    width: 250px;  
    align-items: center;  
    justify-content: center;  
    z-index: 1;  
}  
  
.option {  
    padding: 8px 16px;  
    cursor: pointer;  
}  
  
.option:hover {  
    background-color: var(--color-base-2); /*버튼 마우스오버 시 색상 지정*/  
}
```

![](https://i.imgur.com/7OZ6NiU.png)


해당 구문 사용으로 hover시 색상을 바꾸게 되었음.또한 선택한 data-value 값이 post요청 시 controller로 name : data-value 값으로 잘 넘어가는 것을 확인 하였다.
근데 hover 색상 하나 꾸며주자고 이렇게 긴 코드가 필요하다니... ...빨리 option:hover가 크롬에도 적용되면 좋겠다..