function base32DecodeOneLowerChar(strsizeone) {
    if (strsizeone.toLowerCase().charAt(0) == "a")
    	return BigInt(0);
    else if (strsizeone.toLowerCase().charAt(0) == "b")
    	return BigInt(1);
    else if (strsizeone.toLowerCase().charAt(0) == "c")
    	return BigInt(2);
    else if (strsizeone.toLowerCase().charAt(0) == "d")
    	return BigInt(3);
    else if (strsizeone.toLowerCase().charAt(0) == "e")
    	return BigInt(4);
    else if (strsizeone.toLowerCase().charAt(0) == "f")
    	return BigInt(5);
    else if (strsizeone.toLowerCase().charAt(0) == "g")
    	return BigInt(6);
    else if (strsizeone.toLowerCase().charAt(0) == "h")
    	return BigInt(7);
    else if (strsizeone.toLowerCase().charAt(0) == "i")
    	return BigInt(8);
    else if (strsizeone.toLowerCase().charAt(0) == "j")
    	return BigInt(9);
    else if (strsizeone.toLowerCase().charAt(0) == "k")
    	return BigInt(10);
    else if (strsizeone.toLowerCase().charAt(0) == "l")
    	return BigInt(11);
    else if (strsizeone.toLowerCase().charAt(0) == "m")
    	return BigInt(12);
    else if (strsizeone.toLowerCase().charAt(0) == "n")
    	return BigInt(13);
    else if (strsizeone.toLowerCase().charAt(0) == "o")
    	return BigInt(14);
    else if (strsizeone.toLowerCase().charAt(0) == "p")
    	return BigInt(15);
    else if (strsizeone.toLowerCase().charAt(0) == "q")
    	return BigInt(16);
    else if (strsizeone.toLowerCase().charAt(0) == "r")
    	return BigInt(17);
    else if (strsizeone.toLowerCase().charAt(0) == "s")
    	return BigInt(18);
    else if (strsizeone.toLowerCase().charAt(0) == "t")
    	return BigInt(19);
    else if (strsizeone.toLowerCase().charAt(0) == "u")
    	return BigInt(20);
    else if (strsizeone.toLowerCase().charAt(0) == "v")
    	return BigInt(21);
    else if (strsizeone.toLowerCase().charAt(0) == "w")
    	return BigInt(22);
    else if (strsizeone.toLowerCase().charAt(0) == "x")
    	return BigInt(23);
    else if (strsizeone.toLowerCase().charAt(0) == "y")
    	return BigInt(24);
    else if (strsizeone.toLowerCase().charAt(0) == "z")
    	return BigInt(25);
    else if (strsizeone.toLowerCase().charAt(0) == "2")
    	return BigInt(26);
    else if (strsizeone.toLowerCase().charAt(0) == "3")
    	return BigInt(27);
    else if (strsizeone.toLowerCase().charAt(0) == "4")
    	return BigInt(28);
    else if (strsizeone.toLowerCase().charAt(0) == "5")
    	return BigInt(29);
    else if (strsizeone.toLowerCase().charAt(0) == "6")
    	return BigInt(30);
    else if (strsizeone.toLowerCase().charAt(0) == "7")
    	return BigInt(31);
    else
        throw("base32DecodeOneLowerChar not a thru z or 2 thru 7");
}


function savekey() {
     var SavedKey = document.getElementById("mykey").value;
     console.log(SavedKey);
     calculate(SavedKey);
}

//32 ascii-base32encoded-character x 5 bits per ascii-base32encoded-character ==
//160bits == 20 bytes
function getHexRepresentation(numbigint, symbols) {
    //4 byte-integer == 8 symbols
    //20 byte-integer == 40 symbols
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var result = '';
    while (symbols--) {
        result = hex[numbigint & BigInt(0xF)] + result;
        numbigint >>= BigInt(4);
    }
    
    return result;
}

function calculate(key)
{
    var ii;
    var tempbigint;
    var n = BigInt(0);
    try {
        for (ii=0; ii < key.length; ii++) {
            n <<= BigInt(5);
            tempbigint = base32DecodeOneLowerChar(key.charAt(ii));
            n += tempbigint;
        }
        console.log("n = " + n + " = " + getHexRepresentation(n, 40));
    }
    catch(err) {
        console.log("ERROR: " + err);
    }
}
