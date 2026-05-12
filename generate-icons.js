const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\DAKSH\\Downloads\\in5nitevr logo.jpg';
const destIcon = path.join(__dirname, 'public', 'icon.png');
const destApple = path.join(__dirname, 'public', 'apple-icon.png');
const destFavicon = path.join(__dirname, 'public', 'favicon.ico');

async function generate() {
  try {
    // Generate icon.png (512x512)
    await sharp(src).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } }).toFormat('png').toFile(destIcon);
    console.log('Created icon.png');

    // Generate apple-icon.png (180x180)
    await sharp(src).resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } }).toFormat('png').toFile(destApple);
    console.log('Created apple-icon.png');

    // Generate favicon.ico (16x16, 32x32, 48x48)
    const sizes = [16, 32, 48];
    const buffers = [];
    for (const size of sizes) {
      const pngBuffer = await sharp(src).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } }).toFormat('png').toBuffer();
      buffers.push({ size, buffer: pngBuffer });
    }

    // Create ICO file
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // Reserved
    header.writeUInt16LE(1, 2); // Type (1 = ICO)
    header.writeUInt16LE(sizes.length, 4); // Number of images

    const directories = [];
    let offset = 6 + (16 * sizes.length);

    for (const img of buffers) {
      const dir = Buffer.alloc(16);
      dir.writeUInt8(img.size, 0); // Width
      dir.writeUInt8(img.size, 1); // Height
      dir.writeUInt8(0, 2); // Color count
      dir.writeUInt8(0, 3); // Reserved
      dir.writeUInt16LE(1, 4); // Color planes
      dir.writeUInt16LE(32, 6); // Bits per pixel
      dir.writeUInt32LE(img.buffer.length, 8); // Size of image data
      dir.writeUInt32LE(offset, 12); // Offset of image data
      
      directories.push(dir);
      offset += img.buffer.length;
    }

    const icoBuffer = Buffer.concat([
      header,
      ...directories,
      ...buffers.map(b => b.buffer)
    ]);

    fs.writeFileSync(destFavicon, icoBuffer);
    console.log('Created favicon.ico');

  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

generate();
