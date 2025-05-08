def decrypt(cipher_words, key):
    return [ ''.join(chr(ord(c)^ord(key[i%len(key)])) for i,c in enumerate(w))
             for w in cipher_words ]
