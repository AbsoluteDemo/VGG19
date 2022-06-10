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


def editImage(path):
    image1 = Image.open(path)
    image2 = image1.transpose(Image.FLIP_LEFT_RIGHT)

    # new_path = r"C:Users\Administrator\Desktop\imag\imag1\public" + '\\' + 'new_image.jpg'
    image2.save('public/new_image.jpg')
    # print()


if __name__ == '__main__':
    editImage(sys.argv[1])
