Here's how binary encoding / decoding works in the context of **Least Significant Bit (LSB)** steganography.

### Overview of the Process

1. Converting the message to binary: The text message you want to hide is converted into a binary representation.

2. Embedding the binary data: The binary data is embedded into the least significant bits of the image’s pixel values (in the RGB channels).

3. Decoding: The reverse process extracts the binary data from the image, which is then converted back into the original message.
   Let’s break down each step.

---

#### Step 1: Converting a Message to Binary

When we say we convert the message into binary, it means converting the characters in the message (which are stored as text) into their binary equivalents.

For example, let's say the message is:

```arduino
"Hi"
```

In a computer, characters are represented as ASCII values (or Unicode values). The characters "H" and "i" have the following ASCII values:

- 'H' → ASCII: `72`
- 'i' → ASCII: `105`

Each of these values can be represented as binary:

- 'H' → Binary: `01001000`
- 'i' → Binary: `01101001`

So the message "Hi" becomes a sequence of binary bits:

```arduino
01001000 01101001
```

If your message is longer, you just convert each character into its binary representation.

---

#### Step 2: Embedding the Binary Data (LSB Encoding)

Once you have the binary data for the message, you need to embed this data into the image. This is where **Least Significant Bit (LSB)** encoding comes in.

Images are composed of pixels, and each pixel typically has three color channels (Red, Green, Blue - RGB). Each color channel (R, G, B) is represented by a byte (8 bits), and these bits represent the intensity of the color for that pixel.

For example, let's say we have a pixel with the following RGB values:

```makefile
R = 11001001
G = 10111001
B = 11100011
```

The least significant bit (LSB) of each color channel is the rightmost bit:

```makefile
R = 1100100**1**
G = 1011100**1**
B = 1110001**1**
```

The idea of LSB encoding is to replace these least significant bits with the bits from the binary representation of the message. Since the LSB changes very slightly (from a 1 to a 0 or vice versa), this change is generally imperceptible to the human eye.

---

#### Example of LSB Encoding

Let’s embed the first few bits of the message "Hi" (`01001000`) into an image. Consider the original pixel data:

```less
Pixel 1: R = 11001001, G = 10111001, B = 11100011
Pixel 2: R = 10011010, G = 10111101, B = 11001110
```

The least significant bits of the RGB values for these pixels are:

```less
Pixel 1: R = 1, G = 1, B = 1
Pixel 2: R = 0, G = 1, B = 0
```

Let’s encode the first 8 bits of our message (`01001000`) into these pixels:

1. Take the first 3 bits `010` and embed them in the LSB of Pixel 1:

   - R: `1100100**1**` → `1100100**0**` (set the LSB to 0)
   - G: `1011100**1**` → `1011100**1**` (LSB stays 1)
   - B: `1110001**1**` → `1110001**0**` (set the LSB to 0)

2. Take the next 3 bits `010` and embed them in the LSB of Pixel 2:

   - R: `1001101**0**` → `1001101**0**` (LSB stays 0)
   - G: `1011110**1**` → `1011110**1**` (LSB stays 1)
   - B: `1100111**0**` → `1100111**1**` (set the LSB to 1)

Now, after embedding the first 6 bits of the message, the pixel values become:

```less
Pixel 1: R = 11001000, G = 10111001, B = 11100010
Pixel 2: R = 10011010, G = 10111101, B = 11001111
```

This process continues until all bits of the message are encoded into the image.

---

#### Step 3: Decoding the Message

To decode the message, the process is simply reversed:

Read the least significant bits from each pixel.
Gather these bits together to form a binary sequence.
Convert the binary sequence back into characters.
For example, let’s assume we have the encoded pixels:

```less
Pixel 1: R = 11001000, G = 10111001, B = 11100010
Pixel 2: R = 10011010, G = 10111101, B = 11001111
```

Extract the least significant bits:

```yaml
Pixel 1: LSBs = 000
Pixel 2: LSBs = 010
```

Combining the bits from each pixel gives you the binary sequence: 000010. You continue extracting bits from subsequent pixels until you have the complete binary message, which can then be converted back into text.

---

#### Encoding the Length of the Message

In the example provided, we also encode the length of the message in the first 32 bits of the image. This helps the decoder know how many bits it should extract to retrieve the hidden message.

- The length of the message is first converted into a binary value.

- This binary value is embedded in the least significant bits of the first 32 pixel channels (one bit per channel).

- During decoding, the first 32 bits are extracted and converted back into a number. This number represents the number of bits to extract for the actual message.

For instance, if the length of the message is 16 bits, this number 16 would be stored in the first 32 bits. The decoder would know to extract 16 bits from the subsequent pixel channels to retrieve the hidden message.

---

#### Summary

- Binary encoding converts text into a sequence of binary bits.

- These binary bits are embedded into the least significant bits of the image's pixel values.

- During decoding, the binary data is extracted from the pixel values and converted back into readable text.

- The least significant bits are used because changing them only minimally affects the appearance of the image, making the hidden message imperceptible.

This method of LSB steganography is simple yet effective for hiding small messages in images!
