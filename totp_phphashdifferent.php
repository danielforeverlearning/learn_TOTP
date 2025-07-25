<?php
/*
    TOTP v0.2.0 - a simple TOTP (RFC 6238) class using the SHA1 default

    (c) 2014 Robin Leffmann <djinn at stolendata dot net>

    https://github.com/stolendata/totp/

    Licensed under CC BY-NC-SA 4.0 - http://creativecommons.org/licenses/by-nc-sa/4.0/
*/

class TOTP
{
    private static $base32Map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    private static function base32Decode( $in )
    {
		//chr — Generate a single-byte string from a number
		
        $l = strlen( $in );
        $n = $bs = 0;

        for( $i = 0; $i < $l; $i++ )
        {
            $n <<= 5;
            $n += stripos( self::$base32Map, $in[$i] );
            $bs = ( $bs + 5 ) % 8;
            @$out .= $bs < 5 ? chr( ($n & (255 << $bs)) >> $bs ) : null;
        }

        return $out;
    }

    public static function getOTP( $secret, $digits = 6, $period = 30, $offset = null )
    {
        if( strlen($secret) < 16 || strlen($secret) % 8 != 0 )
            return [ 'err'=>'length of secret must be a multiple of 8, and at least 16 characters' ];
        if( preg_match('/[^a-z2-7]/i', $secret) === 1 )
            return [ 'err'=>'secret contains non-base32 characters' ];
        if( $digits < 6 || $digits > 8 )
            return [ 'err'=>'digits must be 6, 7 or 8' ];

        $seed = self::base32Decode( $secret );
		
		printf("gettype(seed) = %s\n", gettype($seed));
		printf("seed = %s = \n", $seed);
		$seedhexstr = bin2hex($seed);
		echo "seedhexstr = ";
        echo $seedhexstr;
		echo "\n";
		echo "\n";
		
		//time()
		//Returns the current time measured in the number of seconds since the Unix Epoch (January 1 1970 00:00:00 GMT).
        
		//intval(mixed $value, int $base = 10): int
		//Returns the int value of value, using the specified base for the conversion (the default is base 10). intval() should not be used on objects, as doing so will emit an E_WARNING level error and return 1.
		
		$testtime = time();
		$counter  = intval($testtime / 30);
		printf("counter = %d\n", $counter);
		$testpack = pack('N', $counter);
		printf("testpack = %s\n", $testpack);
		$hextestpack = bin2hex($testpack);
		echo "hextestpack = ";
        echo $hextestpack;
		echo "\n";
		echo "\n";
		
		$time = str_pad( pack('N', intval(time() / $period) + $offset ), 8, "\x00", STR_PAD_LEFT );
		
		printf("gettype(time) = %s\n", gettype($time));
		printf("time = %s\n", $time);
		$testtimehexstr = bin2hex($time);
		echo "testtimehexstr = ";
        echo $testtimehexstr;
		echo "\n";
		echo "\n";
		
		
        $hash = hash_hmac( 'sha1', $time, $seed, false );
		//printf("hash = %s\n", $hash);
		$rawsig = hash_hmac( 'sha1', $time, $seed, true );
		$rawsighex = bin2hex($rawsig);
		echo "rawsighex = ";
        echo $rawsighex;
		echo "\n";
		echo "\n";
		
		//The PHP function hash_hmac() generates a keyed hash value 
		//using the HMAC (Hash-based Message Authentication Code) method. 
		//This function is commonly used for message authentication and integrity verification.
		//
		//string hash_hmac(string $algo, string $data, string $key, bool $binary = false)
		//
		//Parameters:
        //$algo: The name of the selected hashing algorithm (e.g., "sha256", "md5", "sha1"). You can retrieve a list of supported algorithms using hash_hmac_algos().
        //$data: The message or data to be hashed.
        //$key: The secret key used for the HMAC calculation.
        //$binary: An optional boolean parameter. 
		//         If set to true, the function returns the raw binary representation of the message digest. 
		//         If false (default), it returns the digest as lowercase hexadecimal characters. 
		
		/****************************************************************************
		While implementing a TOTP application, please note that hash_hmac() must receive data in binary, 
		not in a hexadecimal string, to generate a valid OTP across platforms.
		This problem can be easily fixed by converting a hexadecimal string to its binary form before passing it to hash_hmac().

		<?php
			$time = hex2bin('0000000003523f77'); // time must be in this "hexadecimal and padded" form
			$key = hex2bin('bb57d1...'); // 160-bits = 40-digit hexadecimal (4 bits) = 32-digit base32 (5 bits)

			hash_hmac('sha1', $time, $key);
		?>
		*****************************************************************************/
		
		

		
		
		
        $otp = ( hexdec(substr($hash, hexdec($hash[39]) * 2, 8)) & 0x7fffffff ) % pow( 10, $digits );

        return [ 'otp'=>sprintf("%'0{$digits}u", $otp) ];
    }

    public static function genSecret( $length = 24 )
    {
        if( $length < 16 || $length % 8 != 0 )
            return [ 'err'=>'length must be a multiple of 8, and at least 16' ];

        while( $length-- )
        {
            $c = @gettimeofday()['usec'] % 53;
            while( $c-- )
                mt_rand();
            @$secret .= self::$base32Map[mt_rand(0, 31)];
        }

        return [ 'secret'=>$secret ];
    }

    public static function genURI( $account, $secret, $digits = null, $period = null, $issuer = null )
    {
        if( empty($account) || empty($secret) )
            return [ 'err'=>'you must provide at least an account and a secret' ];
        if( mb_strpos($account . $issuer, ':') !== false )
            return [ 'err'=>'neither account nor issuer can contain a colon character' ];

        $account = rawurlencode( $account );
        $issuer = rawurlencode( $issuer );
        $label = empty( $issuer ) ? $account : "$issuer:$account";

        return [ 'uri'=>'otpauth://totp/' . $label . "?secret=$secret" .
                        (is_null($digits) ? '' : "&digits=$digits") .
                        (is_null($period) ? '' : "&period=$period") .
                        (empty($issuer) ? '' : "&issuer=$issuer") ];
    }
}

printf("hi .....\n");
$myarray = TOTP::getOTP("DFXMZJSEU2GK6PHLP7SPDB2IERS7N57L");
printf("%s\n\n", $myarray["otp"]);


/**********************************************************
$mynewkey = TOTP::genSecret(32);
printf("gettype(mynewkey) = %s\n", gettype($mynewkey));
$countmynewkey = count($mynewkey);
printf("countmynewkey = %d\n", $countmynewkey);
foreach ($mynewkey as $key => $value) {
    echo "Key: " . $key . ", Value: " . $value . "\n";
}
***********************************************************/

?>
