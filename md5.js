md5 = function(sixteen,ffff,length){

	var k = [],i=0;

	var r = [
	
	7, 12, 17, 22,
	5,  9, 14, 20,
	4, 11, sixteen, 23,
	6, 10, 15, 21
	
	];
		for(;i<64;){
		k[i] = ~~(Math.abs(Math.sin(++i)) * 4294967296);
	}

	function rhex(num,str,j){
		str = "";
		for(j=0; j <= 3;)	str += ((num >> (j * 8 + 4)) & 0x0F).toString(sixteen) + ((num >> (j++ * 8)) & 0x0F).toString(sixteen);
		return str;
	}

	function str2blks_MD5(str){
		var	blks = [],i=0;
		for(; str[i];)	blks[i >> 2] |= str.charCodeAt(i) << ((i++ % 4) * 8);
		blks[i >> 2] |= 0x80 << ((i % 4) * 8);
		blks[((str[length] + 8) >> 6)*sixteen+14] = str[length] * 8;
		return blks;
	}

	function add(x, y){
		var lsw = (x & ffff) + (y & ffff);
		var msw = (x >> sixteen) + (y >> sixteen) + (lsw >> sixteen);
		return (msw << sixteen) | (lsw & ffff);
	}
	function rol(num, cnt){
		return (num << cnt)|(num >>> (32 - cnt));
	}


	var calcMD5 = function(str){
		var a,b,c,d,temp,f,i=0,j,m,
		x = str2blks_MD5(unescape(encodeURIComponent(str))),
		h0 =  1732584193,
		h1 = -271733879,
		h2 = ~h0,
		h3 =  ~h1;

		for(; i < x[length]; i += sixteen)
		{
			
			a = h0
			b = h1
			c = h2
			d = h3
			for(j=0;j<64;j++){
				f = [
					((b&c)|((~b)&d)),
					((d&b)|((~d)&c)),
					(b^c^d),
					(c^(b|(~d)))
				][m=j>>4];
				temp = d
				d = c
				c = b
				b = add(b , 
						rol(add(add(a , f
						 ) ,add( k[j] , x[[
					j,
					(5*j+1),
					(3*j+5),
					(7*j)
				][m]%sixteen+i])) , r[4*m+j%4]))
				a = temp
			}
			h0 = add(h0 , a)
			h1 = add(h1 , b)
			h2 = add(h2 , c)
			h3 = add(h3 , d)

		}
		return rhex(h0) + rhex(h1) + rhex(h2) + rhex(h3);
	}
	return calcMD5;
}(16,0xffff,'length');