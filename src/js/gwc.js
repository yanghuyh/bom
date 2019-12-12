(function(){
	class ShoppingCart{
		constructor(containerId,products){
			this.container = document.getElementById(containerId);
			this.shopList = document.createElement('table');
			this.cartList = document.createElement('table');
			this.products = products;
			this.cartProducts = this.getStorage()||[];
			this.container.appendChild(this.shopList);
			this.container.appendChild(this.cartList);
		}
		setStorage(json){
			localStorage.setItem('cfg',JSON.stringify(json));
		}
		getStorage(){
			return JSON.parse(localStorage.getItem('cfg'))||[];
		}		
		init(){
			this.initShopList();
			if(this.getStorage().length>0){
				this.renderCartList()
			}
		}
		initShopList(){
			var str = `<thead>
						<tr>
							<th>商品名称</th>
							<th>商品图片</th>
							<th>详情</th>
							<th>商品价格</th>
							<th>操作</th>
						</tr>
					   </thead>`;

			str+="<tbody>";
			this.products.forEach((value)=>{
				str+=`<tr>
					<td>${value.name}</td>
					<td><img src="${value.pic}"></td>
					<td>${value.id}</td>
					<td>${value.price}</td>
					<td>
						<a href="javascript:;" class="addCart btn btn-danger btn-lg">加入购物车</a>
					</td>
				</tr>`
			})
			str+"</tbody>";
			this.shopList.innerHTML = str;
			this.addCartListEvent()
		}
		addCartListEvent(){
			var that = this;
			var addCartBtnArr = this.container.querySelectorAll('.addCart');
			addCartBtnArr.forEach((addCartBtn)=>{
				addCartBtn.onclick = function(){
					var tr = this.parentNode.parentNode;
					var currentProduct = {
                        name:tr.children[0].innerHTML,
                        pic:tr.children[1].children[0].src,
						id:tr.children[2].innerHTML,
						price:tr.children[3].innerHTML,
					}	
					that.addToCartProducts(currentProduct);
					that.renderCartList();
				}
			})
		}
		addToCartProducts(currentProduct){
			this.cartProducts = this.getStorage();
			for(var i=0;i<this.cartProducts.length;i++){
				if(this.cartProducts[i].id==currentProduct.id){
					this.cartProducts[i].num++;
					this.setStorage(this.cartProducts);
					return;
				}
			}
			currentProduct.num = 1;
			this.cartProducts.push(currentProduct);		
			this.setStorage(this.cartProducts);
		}
		renderCartList(){
			var str = `<thead>
				<tr>
					<th>商品名称</th>
					<th>商品图片</th>
					<th>详情</th>
					<th>价格</th>
					<th>商品数量</th>
					<th>操作</th>
				</tr>
			</thead>`;

			str+="<tbody>";
			this.getStorage().forEach((product)=>{
				str+=`<tr>
					<td>${product.name}</td>
					<td><img src="${product.pic}"></td>
					<td>${product.id}</td>
					<td>${product.price}</td>
					<td class="change">
					<span class=" btn-group">
						<span class="jian btn btn-default">-</span>
						<span class="btn btn-default">${product.num}</span>
						<span class="jia btn btn-default">+</span>
					</span>
					</td>
					<td>
						<a href="javascript:;" class="del btn btn-danger btn-lg">删除</a>
					</td>
				</tr>`
			});

			str+="</tbody>";
			this.cartList.innerHTML = str;
			this.deleteProductEvent();
			this.changeNumEvent();
			this.Settlement();
		}
		Settlement(){
			var arr = this.getStorage();
			for(var i=0,str=0,kk=0;i<arr.length;i++){
				str+=arr[i].num;
				kk+=(arr[i].num)*(arr[i].price);
			}
			var totalMoney=document.querySelector('.total_text');
			var piece=document.querySelector('.piece_num');
			var calBtn=document.querySelector('.calBtn a');
			piece.innerHTML=str;
			totalMoney.innerHTML=kk;
			if(kk>0){
				calBtn.style.background="red";
				calBtn.style.cursor="pointer";
			}else{
				calBtn.style.background="#B0B0B0";
				calBtn.style.cursor="not-allowed";
			}		
		}

		changeNumEvent(){
			var that = this;
			var changeNumTdArr = this.container.querySelectorAll('.change');
			changeNumTdArr.forEach((changeNumTd)=>{
				changeNumTd.onclick = function(e){
					var target = e.target;
                    var id = this.parentNode.children[0].innerHTML;
					if(e.target.className=="jian btn btn-default"){
						
						that.jianNum(id);
					}
					if(e.target.className=="jia btn btn-default"){
						that.jiaNum(id)
						that.renderCartList();

					}
				}
			})
		}
		jianNum(id){
            var arr = this.getStorage();
			for(var i=0;i<arr.length;i++){
				if(arr[i].name==id){
					arr[i].num--;
					this.setStorage(arr);	
					this.renderCartList();
					if(arr[i].num<=0){                        
						this.deleteFromCartProducts(id);
						return;
					}										
					return;
				}
			}
		}
		jiaNum(id){
			var arr = this.getStorage();
			for(var i=0;i<arr.length;i++){
				if(arr[i].name==id){
					arr[i].num++;					
					this.setStorage(arr);
					return;
				}
			}
		}
		deleteProductEvent(){
			var that = this;
			var delBtnArr = this.container.querySelectorAll('.del');
			delBtnArr.forEach((delBtn)=>{
				delBtn.onclick = function(){
					var id = this.parentNode.parentNode.children[0].innerHTML;
					that.deleteFromCartProducts(id);					
					
				}
			})
		}
		deleteFromCartProducts(id){
			this.cartProducts = this.getStorage();
			this.cartProducts = this.cartProducts.filter((product)=>{                
				if(product.name==id){
					return false;
				}else{
					return true;
				}
			});
			this.setStorage(this.cartProducts);	
			this.renderCartList();
			if(this.getStorage().length<1){
				this.cartList.innerHTML = "";
			}
		}
	}
	var car = new ShoppingCart("container",products);
	car.init()
})()