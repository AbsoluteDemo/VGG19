from PIL import Image
import numpy as np
import sys
import os.path

def shouhui(path):
    im = np.array(Image.open(path).convert("L")).astype("float")#将图片rgb置成灰度值

    depth = 10    #立体效果 数值越大 例题效果越明显
    grad = np.gradient(im)
    grad_x,grad_y = grad        #x,y轴方向梯度
    grad_x = grad_x * depth / 100
    grad_y = grad_y * depth / 100

    s = np.sqrt(grad_x**2 + grad_y**2 + 1.)
    uni_x = grad_x / s
    uni_y = grad_y / s
    uni_z = 1. / s

    vec_el = np.pi/2.8         #仰视角  当数值非常大或者数值非常小时  图像就很暗
    vec_az = np.pi/4            #观察角  改变数值变化好像不大
    dx = np.cos(vec_el)*np.cos(vec_az)
    dy = np.cos(vec_el)*np.sin(vec_az)
    dz = np.sin(vec_el)

    b = 255*(dx*uni_x + dy*uni_y + dz*uni_z)
    b = b.clip(0,255)

    filename = os.path.basename(path)
    im = Image.fromarray(b.astype("uint8"))
    im.save(os.path.join('src/static/images', '1'+filename))  #保存图片

if __name__ == '__main__':
    shouhui(sys.argv[1])
