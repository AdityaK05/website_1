"""
Profile Image Setup Script
This script helps convert and optimize your profile image for the portfolio
"""

import os
from PIL import Image, ImageDraw
import io

def setup_profile_image(image_path, output_dir):
    """
    Convert profile image to circular format and save as profile.jpg
    
    Args:
        image_path: Path to the profile image
        output_dir: Directory to save the processed image
    """
    try:
        # Open the image
        img = Image.open(image_path)
        
        # Convert to RGB if necessary (for PNG with transparency, etc.)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Get the minimum dimension to create a square
        size = min(img.size)
        
        # Crop to square (centered)
        left = (img.width - size) / 2
        top = (img.height - size) / 2
        right = (img.width + size) / 2
        bottom = (img.height + size) / 2
        
        img = img.crop((left, top, right, bottom))
        
        # Resize to reasonable size (400x400 for good quality)
        img = img.resize((400, 400), Image.Resampling.LANCZOS)
        
        # Create circular mask for profile picture
        mask = Image.new('L', (400, 400), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse((0, 0, 400, 400), fill=255)
        
        # Apply mask
        output = Image.new('RGBA', (400, 400), (0, 0, 0, 0))
        output.paste(img, (0, 0), mask)
        
        # Convert back to RGB for JPEG
        final_img = Image.new('RGB', (400, 400), (255, 255, 255))
        final_img.paste(output, (0, 0), output)
        
        # Save the image
        output_path = os.path.join(output_dir, 'profile.jpg')
        final_img.save(output_path, 'JPEG', quality=95)
        
        print(f"✅ Profile image successfully created: {output_path}")
        print(f"Image size: 400x400 pixels")
        return True
        
    except Exception as e:
        print(f"❌ Error processing image: {str(e)}")
        return False

if __name__ == "__main__":
    # Get the current directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("=" * 50)
    print("PROFILE IMAGE SETUP")
    print("=" * 50)
    
    # For manual setup
    print("\nTo use this script:")
    print("1. Place your profile image in the same folder as this script")
    print("2. Run: python setup_image.py")
    print("\nOr use in code:")
    print("  setup_profile_image('path/to/image.jpg', 'output/folder')")
    print("\nThe image will be:")
    print("  - Cropped to square")
    print("  - Resized to 400x400 pixels")
    print("  - Made circular")
    print("  - Saved as profile.jpg")
