# from PIL import Image
# import json
# import sys

# def editImage(path):
#     image1=Image.open(path)
#     image2 = image1.transpose(Image.FLIP_LEFT_RIGHT)

#     new_path=r"C:Users/Administrator/Desktop/imag/imag1/public"+'\\'+'new_image.jpg'
#     image2.save(new_path)
#     print(new_path)
#     sys.stdout.flush()


# if __name__ == '__main__':
#     editImage(sys.argv[0])

from PIL import Image
import json
import sys
import os.path


def editImage(path, fangxiang):

    image1 = Image.open(path)
    if fangxiang == "zuoyou":
        image2 = image1.transpose(Image.FLIP_LEFT_RIGHT)
    if fangxiang == "shangxia":
        image2 = image1.transpose(Image.FLIP_TOP_BOTTOM)
    filename = os.path.basename(path)
    # new_path = r"C:Users\Administrator\Desktop\imag\imag1\public" + '\\' + 'new_image.jpg'
    image2.save(os.path.join('src/static/images', fangxiang+filename))
    # print()


if __name__ == '__main__':
    editImage(sys.argv[1], sys.argv[2])
