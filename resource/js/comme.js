(function(w){
	function fors(a,fn){if(!a.length)a=[a];for(var i=0,len=a.length;i<len;i++){fn.call(a[i],i);}}
	function getID(a){ return document.getElementById(a)}
	function getTag(a,b){ return b.getElementsByTagName(a)}
	function getCls(a,b){
		var arr = [];
		if(b.getElementsByClassName){
			arr = b.getElementsByClassName(a)
		}else{
			fors(getTag('*',b),function(){
				if(this.className == a){
					arr.push(this)
				}
			})
		}
		arr = arr.length ==1?arr[0]:arr;
		return arr;
	}
	function adCls(ele , cls) {
		if(ele.classList){
			ele.classList.add(cls)
		}else{
			var str=ele.className;
			if((str=str.replace(cls,''))){};
			ele.className = str+' '+cls;
		}
	}
	function reCls(ele , cls){
		if(ele.classList){
			ele.classList.remove(cls);
		}else{
			ele.className = ele.className.replace(cls , '');
		}
	}
	function evt(e,def,pr){
		e = e || window.event;
		if(!def){	//缺省执行
			if(!e.stopPropagation){	//IE
				e.cancelBubble = true
			}else{
				e.stopPropagation()
			}				
		}
		if(!pr){
			if(!e.preventDefault){	//IE
				e.returnValue = false
			}else{
				e.preventDefault()
			}
		}
	};
	w.G = {
		tab : function(parent,tit,tag,cnt,cls,current){
			current = current || 'current';
			var p = getID(parent)
				,li = getTag(tag,getCls(tit,p))
				,cnt = getCls(cls,getCls(cnt,p));
			function show(i){
				fors(li,function(j){
					reCls(this,current);
					cnt && cnt[j] && (cnt[j].style.display='none')
					if(j==i){
						adCls(this,current)
						cnt && cnt[j] && (cnt[j].style.display='block')
					}
				})
			}
			fors(li,function(i){
				this.onclick = function(){
					show(i);
				}
			});
		}
		,student : function(titid,tit,tag,cnt,cls,current){
			current = current || 'current';
			var tid = getID(titid)
				,li = getTag(tag,getCls(tit,tid))
				,cnt = getCls(cls,getCls(cnt,tid));
			function show(i){
				fors(li,function(j){
					reCls(this,current);
					if(!this.firstChild.nodeValue){
						this.innerHTML = this.firstChild.firstChild.nodeValue
					}
					cnt && cnt[j] && (cnt[j].style.display='none')
					if(j==i){
						adCls(this,current)
							showList(j);
						if(this.firstChild.nodeValue){
							this.innerHTML = '<span>'+this.innerHTML+'</span>'
						}
						cnt && cnt[j] && (cnt[j].style.display='block')
					}
				})
			}
			fors(li,function(i){
				this.onclick = function(){
					show(i);
				}
			});
		}
		,hover : function(id,cls,cur){
			var p = getID(id);
			fors(getCls(cls,p),function(i){
				this.onmouseover = function(){
					adCls(this,cur)
				}
				this.onmouseout = function(){
					reCls(this,cur)
				}
			})
		}
		,filghts : function(par,tit,tag,cnt,cls){
			var p = getID(par)
				,li = getTag(tag,getCls(tit,p))
				,cnt = getCls(cls,getCls(cnt,p));			
			function show(i){
				fors(li,function(j){
					reCls(this,'cur'+(j+1));
					cnt && cnt[j] && (cnt[j].style.display='none')
					if(j==i){
						adCls(this,'cur'+(j+1))
						cnt && cnt[j] && (cnt[j].style.display='block')
					}
				})
			}
			fors(li,function(i){
				this.onclick = function(){
					show(i);
				}
			});
		}
		,my_info : function(id,on,off){
			var p = getID(id);
			p.onmouseover = function(e){
				evt(e);
				this.className = on;
			}
			p.onmouseout = function(e){
				evt(e);
				this.className = off;
			}
		}
		,tab_hover : function(id,cls,name){
			fors(getCls(cls,getID(id)),function(){	
				this.onmouseover = function(e){
					evt(e);
					adCls(this,name);
				}
				this.onmouseout = function(e){
					evt(e);
					reCls(this,name);
				}
				if(getCls('close',this)){
					getCls('close',this).onclick = function(){
						reCls(this.parentNode.parentNode.parentNode,name);
					}
				}
			})
		}
		,hb_hover : function(id,cls,name){
			var p = getCls('zhuan_info',getID(id));
			p = p.length?p:[p];
		
			fors(p,function(){
				var ele = getCls(cls,this);
				ele = ele.length?ele:[ele];
				fors(ele,function(){				 
					this.onmouseover = function(e){
						evt(e);
						adCls(this,name);
					}
					this.onmouseout = function(e){
						evt(e);
						reCls(this,name);
					}
				})
			})
		}
		,pic_tab : function(parent,dt,dd,tag,tim){ //图片切换 父，大图，小图div,小图tag
			var p = getID(parent)
				,dt = getTag(dt,p)[0]
				,dtimg = getTag('img',dt)[0]
				,dd = getTag(dd,p)[0]
				,li = getTag(tag,dd)
				,img;
			function show(i){
				fors(li,function(j){
					reCls(this,'current');
					if(j==i){
						img = li[i].lastChild;
						dtimg.src = img.src.replace(img.src.substr(-4),'_big'+img.src.substr(-4));
						adCls(this,'current')
					}
				})
			}
			fors(li,function(i){
				this.onclick = function(){	
					show(i)
				}
			});

			if(tim){
				var t = 0;
				setInterval(function(){
					t++;
					if(t>=li.length){ t= 0}
					show(t);
				},tim);
			}
		}
		,list_click : function(){ //其它航班点击效果
			var infos = getCls('more_info',getID('Wapper'));
			var z , list;
			if(infos){
				fors(infos,function(){
					this.onclick = function(){
						z = this.parentNode.parentNode;
						if(z.nextElementSibling){
							list = z.nextElementSibling;
						}else{
							list = z.nextSibling;
						}
						list.style.display = list.style.display == ''?'none':'';
					}
				})
			}

		}
		,order_info : function(){ //订单详情
			var wap = getID('Wapper'),
				order = getCls('detail_btn',wap),
				tgbtn = getCls('tgqbtn',wap),
				ordermore = getCls('order_more',wap),
				lists = getCls('lists',wap),
				ruletxt = getCls('ruletxt',wap)
				,a=false , b=false;
			if(order){
				fors(order,function(){
					this.onclick = function(){
						if(a===false){
							a=true;
							ordermore.style.display=''
							lists.style.display='none'
						}else{
							a=false;
							ordermore.style.display='none'
							lists.style.display=''
						}
					}
				})
			}
			if(tgbtn){
				fors(tgbtn,function(){
					this.onclick = function(){
						if(b===false){
							b=true;
							ruletxt.style.display='none';
							cur('tgqbtn');
						}else{
							b=false;
							ruletxt.style.display='';
							cur('tgqbtn current');
						}
					}
				});
				function cur(val){
					fors(tgbtn,function(){
						this.className = val;
					})
				}
			}
		}
		,pop : function(){ //弹出匡
			var bg = getID('pop_bg')
			,pop = getID('pop')
			,close = getCls('close',pop);
			close.onclick = function(){
				pop.style.display ='none'
				bg.style.display ='none'
			}
			window.onresize = function(){  //弹出匡
				setTimeout(function(){
				  pop.style.display ='block'
				   bg.style.display ='block'  
					var w = document.documentElement.clientWidth;
					var h = document.documentElement.clientHeight;
					bg.style.height = h+'px';
					pop.style.left = w/2-pop.clientWidth/2+'px'
					pop.style.top = h/2-pop.clientHeight/2+'px'
				},300);
			}
			onresize();
		}
		
		
	}

})(window);
