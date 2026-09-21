#from gamepadSupport import gamepad_support
print("initalizing engine...")
#print("Importing OpenGL Modules...")

import io
import sys
import threading
recursionLimit = 999999999
sys.setrecursionlimit(recursionLimit)

#from OpenGL.GL import *
#from OpenGL.GLU import *

#print("Imported OpenGL Modules!")
print("initalized engine!")

print("App Or Game Is Running " \
      + "Using The Bananakitssu's 3D Python Engine (BTPE) and " \
      + "it's running on version 1.0.0 BETA mode")

global walkSpeed
global version
global isTurtleRegistered
global turtle
global timerOn
global drawing
global elapsed_time
global revered
global wireframeColor
global wireframeThickness
global points
global meshesShown
global FOV
global added_shaders
global applied_shaders
global cache
global fps
global fake_fps
import time
fps = 0
fake_fps = 0
meshesShown = 0
points = 0
wireframeThickness = 3
wireframeColor = 'green'
walkSpeed = 0.10
isTurtleRegistered = False
turtle = "N/A"
version = "1.0.0 BETA"
drawing = False
registeredAfterDraw = False
isConfigured = False
hasCamera = False
revered = True
cameras = {"main": "Camera"}
cache_files = []
import os

folder_path = "BTDPE_Cache"
os.makedirs(folder_path, exist_ok=True)


def _load_cache():
    """Load cached files into memory."""
    cache_files.clear()

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        if not os.path.isfile(file_path):
            continue

        try:
            with open(file_path, "r", encoding="utf-8") as file:
                data = file.read()

            cache_files.append(
                {
                    "file-path": file_path,
                    "name": filename,
                    "folder-path": folder_path,
                    "cache": data,
                }
            )
        except (OSError, UnicodeError) as error:
            print(f"Could not read cache file {filename}: {error}")


_load_cache()

def count_fps ():
    global fake_fps
    while True:
        fake_fps = fake_fps + 1
        time.sleep(0.000001)

def fps_set ():
    global fake_fps
    global fps
    while True:
        time.sleep(1)
        fps = fake_fps
        fake_fps = 0

fps_thread1 = threading.Thread(target=count_fps)
fps_thread2 = threading.Thread(target=fps_set)
fps_thread1.start()
fps_thread2.start()

cameraData = {"main": {"for": "main", "x": 0, "y": 0, "z": 0}}
meshes = { \
        "cube": {"name": "cube", "type": "cube", "shaders_enabled": False, "edges": { \
            "2": {"x": 0.001, "y": 0.001, "z": 0.001}, "3":{"x": 0.001, "y": -0.001, "z": 0.001}, \
            "6": {"x": 0.001, "y": -0.001, "z": -0.001}, "4": {"x": -0.001, "y": -0.001, "z": 0.001}, \
            "7": {"x": 0.001, "y": 0.001, "z": -0.001}, "8": {"x": -0.001, "y": 0.001, "z": -0.001}, \
            "5": {"x": -0.001, "y": -0.001, "z": -0.001}, "1": {"x": -0.001, "y": 0.001, "z": 0.001}}, \
         "mesh_position": {"x": 0, "y": 0, "z": 0}, "mesh_rotation": {"x": 0, "y": 0, "z": 0}, \
         "mesh_size": {"x": 1, "y": 1, "z": 1}, "textures": {"front": "", "back": "", "left": "", "right": "", "top": "", "bottom": ""}, \
         "mesh_color_r": 100, "mesh_color_g": 0, "mesh_color_b": 0, "mesh_attributes": {\
             "canTransparent": False, "visible": True, "opacity": 1}}, \
        "cube (1)": {"name": "cube (1)", "type": "cube", "shaders_enabled": False, "edges": { \
            "2": {"x": 0.001, "y": 0.001, "z": 0.001}, "3":{"x": 0.001, "y": -0.001, "z": 0.001}, \
            "6": {"x": 0.001, "y": -0.001, "z": -0.001}, "4": {"x": -0.001, "y": -0.001, "z": 0.001}, \
            "7": {"x": 0.001, "y": 0.001, "z": -0.001}, "8": {"x": -0.001, "y": 0.001, "z": -0.001}, \
            "5": {"x": -0.001, "y": -0.001, "z": -0.001}, "1": {"x": -0.001, "y": 0.001, "z": 0.001}}, \
         "mesh_position": {"x": 0, "y": -2, "z": 0}, "mesh_rotation": {"x": 0, "y": 0, "z": 0}, \
         "mesh_size": {"x": 1, "y": 1, "z": 1}, "textures": {"front": "", "back": "", "left": "", "right": "", "top": "", "bottom": ""}, \
         "mesh_color_r": 100, "mesh_color_g": 0, "mesh_color_b": 0, "mesh_attributes": {\
             "canTransparent": False, "visible": True, "opacity": 1}} \
    }
added_shaders = [{"name": "defualt", "data": "define main(): return 0"}]
applied_shaders = ["defualt"]

registered_meshes = ["cube", "cube (1)"]
FOV = 70
global CamX
CamX = 0
global CamY
CamY = 0
global CamZ
CamZ = 1
global CamRotZ
global CamRotY
global CamRotX
CamRotX = 0
CamRotY = 0
CamRotZ = 0

def w ():
    global CamZ
    global walkSpeed
    CamZ -= walkSpeed

def s ():
    global CamZ
    global walkSpeed
    CamZ += walkSpeed

def a ():
    global CamX
    global walkSpeed
    CamX -= walkSpeed

def d ():
    global CamX
    global walkSpeed
    CamX += walkSpeed

def up ():
    global CamY
    global walkSpeed
    CamY += walkSpeed

def down ():
    global CamY
    global walkSpeed
    CamY -= walkSpeed

def set_resolution (width=900, height=500, BTDPE_Turtle=None):
    """Sets the width and height of the turtle window."""
    BTDPE_Turtle.setup(width, height)

def get_vsync_value ():
    import pygame
    pygame.init()
    info = pygame.display.Info()
    vsync = info.current_h
    pygame.quit()
    return vsync

def left_arrow ():
    global CamRotY
    CamRotY += 0.05
    if CamRotY > 1 or CamRotY == 1:
        CamRotY = 0
    elif CamRotY < 0.00:
        CamRotY = 0.99

def right_arrow ():
    global CamRotY
    CamRotY -= 0.05
    if CamRotY > 1 or CamRotY == 1:
        CamRotY = 0
    elif CamRotY < 0.00:
        CamRotY = 0.99

def up_arrow ():
    global CamRotX
    CamRotX += 0.05
    print('did:rot')
    if CamRotX > 1 or CamRotX == 1:
        CamRotX = 0
    elif CamRotX < 0.00:
        CamRotX = 0.99

def down_arrow ():
    global CamRotX
    CamRotX -= 0.05
    if CamRotX > 1 or CamRotX == 1:
        CamRotX = 0
    elif CamRotX < 0.00:
        CamRotX = 0.99

#class Scene ():
#    def add_mesh ():
#        print('meshii')

def create_mesh (meshType, name, position, size, orientation, shadersAllowed, allShaders, shaderType, castShadows, receiveShadows, textureClass, \
                 color, attributes, textures):
    """Creates A Mesh And Adds It To The Scene."""
    if meshType == "cube":
        if position and size and orientation:
            meshes[name] = {"name": name, "type": meshType, "shadersEnabled": shadersAllowed, "mesh_position": {"x": position["x"], "y": position["y"], "z": position["z"]}, \
                          "edges": { \
            "2": {"x": 0.001, "y": 0.001, "z": 0.001}, "3":{"x": 0.001, "y": -0.001, "z": 0.001}, \
            "6": {"x": 0.001, "y": -0.001, "z": -0.001}, "4": {"x": -0.001, "y": -0.001, "z": 0.001}, \
            "7": {"x": 0.001, "y": 0.001, "z": -0.001}, "8": {"x": -0.001, "y": 0.001, "z": -0.001}, \
            "5": {"x": -0.001, "y": -0.001, "z": -0.001}, "1": {"x": -0.001, "y": 0.001, "z": 0.001}}, \
                          "mesh_rotation": orientation, "mesh_size": size, "textures": textures, "mesh_color_r": color["r"], "mesh_color_g": color["g"], \
                          "mesh_color_b": color["b"], "mesh_attributes": attributes}
            registered_meshes.append(name)
                          

def get_file_data(file_path):
    """Read a file using the persistent BTDPE cache."""
    requested_path = os.path.abspath(file_path)

    for cached in cache_files:
        if cached["name"] == os.path.basename(requested_path):
            return cached["cache"]

    try:
        with open(requested_path, "r", encoding="utf-8") as file:
            data = file.read()
    except (OSError, UnicodeError) as error:
        print(f"Could not read {file_path}: {error}")
        return None

    cache_path = os.path.join(folder_path, os.path.basename(requested_path))

    try:
        with open(cache_path, "w", encoding="utf-8") as file:
            file.write(data)
    except (OSError, UnicodeError) as error:
        print(f"Could not write cache for {file_path}: {error}")
        return data

    cache_files.append(
        {
            "file-path": cache_path,
            "name": os.path.basename(requested_path),
            "folder-path": folder_path,
            "cache": data,
        }
    )

    return data

def apply_shader (name):
    """Applies A Shader For The Engine"""
    for counter in range (0, len(applied_shaders)):
        shader = applied_shaders[counter]
        if shader:
            if shader['name'] == name:
                print('applied shader!')

def create_shader (name, data):
    """Creates A Shader For The Engine"""
    global added_shaders
    if name and data:
        added_shaders.append({"name": name, "data": data})
        return {"worked?": True, "msg": None}
    else:
        givenName = False
        givenData = False
        if name:
            givenName = True
        else:
            givenName = False
        if data:
            givenData = True
        else:
            givenData = False
        if not givenName and givenData:
            return {"worked?": False, "msg": "No Given Data And No Given Name."}
        elif not givenName:
            return {"worked?": False, "msg": "No Given Name."}
        else:
            return {"worked?": False, "msg": "No Given Data."}

def get_point_position(pointNumber, mesh):
    """Return the world-space position of one mesh vertex."""
    if not isinstance(mesh, dict) or "edges" not in mesh:
        return None

    point = mesh["edges"].get(str(pointNumber))
    if point is None:
        return None

    rotation_z = mesh["mesh_rotation"]["z"] * 2 - CamRotZ * 2
    rotation_y = mesh["mesh_rotation"]["y"] * 2 - CamRotY * 2
    rotation_x = mesh["mesh_rotation"]["x"] * 2 - CamRotX * 2

    x = mesh["mesh_position"]["x"] + point["x"]
    y = mesh["mesh_position"]["y"] + point["y"]
    z = mesh["mesh_position"]["z"] + point["z"]

    if point["x"] > 0.000:
        y -= rotation_z
        if point["y"] > 0.000:
            x += rotation_z
    else:
        y += rotation_z
        if point["y"] < 0.000:
            x -= rotation_z

    if point["z"] > 0.000:
        x -= rotation_y
        if point["y"] > 0.000:
            z += rotation_y
    else:
        y += rotation_y
        if point["y"] < 0.000:
            z -= rotation_y

    if point["z"] > 0.000:
        y -= rotation_x
        if point["y"] > 0.000:
            z += rotation_x
    else:
        y += rotation_x
        if point["y"] < 0.000:
            z -= rotation_x

    x += mesh["mesh_size"]["x"] / 2 if point["x"] > 0.000 else -mesh["mesh_size"]["x"] / 2
    y += mesh["mesh_size"]["y"] / 2 if point["y"] > 0.000 else -mesh["mesh_size"]["y"] / 2
    z += mesh["mesh_size"]["z"] / 2 if point["z"] > 0.000 else -mesh["mesh_size"]["z"] / 2

    return {"x": x, "y": y, "z": z}

def get_mesh_by_name (meshName):
    if meshes[meshName]:
        return meshes[meshName]
    else:
        return "nil"

def get_mesh_by_position (x, y, z):
    counted = 0
    for counter in range(0, len(registered_meshes)):
        counted += 1
        meshName = registered_meshes[counter]
        if meshes[meshName] and meshes[meshName]["mesh_position"]["x"] == x and meshes[meshName]["mesh_position"]["y"] == y and meshes[meshName]["mesh_position"]["z"] == z:
            return meshes[meshName]
    return "nil"

#GPSupport = gamepad_support()

def is_touching_obj (obj):
    """Returns the obj that it is touching"""

def _project_point(point):
    denominator = point["z"] + CamZ
    return (
        FOV * ((point["x"] - CamX) / denominator),
        FOV * ((point["y"] - CamY) / denominator),
    )


def _draw_face(t, projected, point_numbers, color="red"):
    t.fillcolor(color)
    t.penup()
    t.goto(*projected[point_numbers[0]])
    t.begin_fill()
    t.pendown()
    for number in point_numbers[1:]:
        t.goto(*projected[number])
    t.goto(*projected[point_numbers[0]])
    t.end_fill()
    t.penup()


def draw(t):
    global points
    global meshesShown

    meshesShown = 0
    points = 0

    t.getscreen().tracer(18000)
    t.clear()
    t.penup()

    wireframe_path = (1, 2, 3, 4, 5, 6, 7, 8, 5)
    connecting_edges = ((8, 1), (4, 3), (3, 6), (7, 2))

    y_faces = ((4, 5, 6, 3), (1, 2, 7, 8))
    x_faces = ((1, 8, 5, 4), (2, 3, 6, 7))
    z_faces = ((1, 2, 3, 4), (5, 6, 7, 8))

    for mesh_name in registered_meshes:
        mesh = meshes.get(mesh_name)
        if not mesh or mesh.get("type") != "cube":
            continue

        t.hideturtle()
        t.width(wireframeThickness)

        mesh_points = {
            number: get_point_position(number, mesh)
            for number in range(1, 9)
        }

        point1 = mesh_points[1]
        if point1 is None:
            continue

        denominator = point1["z"] + CamZ
        screen_x = FOV * ((point1["x"] + CamX) / denominator)
        screen_y = FOV * ((point1["y"] + CamY) / denominator)

        if screen_x <= -450 or screen_y <= -250:
            continue

        points += len(mesh["edges"])
        meshesShown += 1

        projected = {
            number: _project_point(point)
            for number, point in mesh_points.items()
        }

        t.color(wireframeColor)
        t.penup()
        t.goto(*projected[wireframe_path[0]])
        t.pendown()
        for number in wireframe_path[1:]:
            t.goto(*projected[number])

        t.penup()
        for start_point, end_point in connecting_edges:
            t.goto(*projected[start_point])
            t.pendown()
            t.goto(*projected[end_point])
            t.penup()

        faces = y_faces if CamY > mesh["mesh_position"]["y"] else tuple(reversed(y_faces))
        for face in faces:
            _draw_face(t, projected, face)

        faces = x_faces if CamX > mesh["mesh_position"]["x"] else tuple(reversed(x_faces))
        for face in faces:
            _draw_face(t, projected, face)

        faces = z_faces if CamZ > mesh["mesh_position"]["z"] else tuple(reversed(z_faces))
        for face in faces:
            _draw_face(t, projected, face)

global timerOn
global elapsed_time

timerOn = False
elapsed_time = 0

global limit_fps

limit_fps = 60

import asyncio

async def wait_example(time_sec):
    print("Waiting asynchronously...")
    await asyncio.sleep(time_sec)
    print("Done!")

def add_draw_time ():
    import time
    global elapsed_time
    global timerOn
    if timerOn:
        elapsed_time += 1
        time.sleep(0.001)
        add_draw_time()

def stop_draw_timer ():
    global timerOn
    if timerOn:
        timerOn = False

def start_draw_timer ():
    global timerOn
    global elapsed_time
    if timerOn:
        stop_draw_timer()
    timerOn = True
    elapsed_time = 0
    add_draw_time()

global frameFunctions
frameFunctions = []

def afterFrame ():
    global frameFunctions
    for counter in range(0, len(frameFunctions)):
        function = frameFunctions[counter]
        function()

def addAfterFrame (func):
    global frameFunctions
    frameFunctions.append(func)

def request_draw_3D (t):
    #t.onkey(w, 'w')
    #t.listen()
    global drawing
    global points
    global meshesShown
    global CamX
    global CamY
    global CamZ
    global fps
    if drawing:
        return
    #start_draw_timer()
    threading.Thread(target=start_draw_timer).start()
    registeredAfterDraw = False
    drawing = True
    #t.onkeypress(w, 'w')
    #t.listen()
    draw(t)
    t.color('white')
    #t.goto(-435, -240)
    #t.write(f"FPS: {round(60 / ((elapsed_time / 1000) + 1))} / {round(60 / 1)}", False, 'left', font=('Fredoka One', 10, 'normal'))
    t.goto(-435, 240 - 10)
    t.write(f"Points From Meshes Shown: {points}", False, 'left', font=('Fredoka One', 10, 'normal'))
    t.goto(-435, 240 - 25)
    t.write(f"Meshes Shown: {meshesShown}", False, 'left', font=('Fredoka One', 10, 'normal'))
    t.goto(-435, 240 - 40)
    t.write(f"X: {round(CamX)}, Y: {round(CamY)}, Z: {round(CamZ)}", False, 'left', font=('Fredoka One', 10, 'normal'))
    drawing = False
    stop_draw_timer()
    t.goto(-435, -240)
    #t.write(f"FPS: {round(limit_fps / ((elapsed_time / 1000) + 1))} / {round(limit_fps / 1)}", False, 'left', font=('Fredoka One', 10, 'normal'))
    t.write(f"FPS: {fps} / {round(limit_fps / 1)}", False, 'left', font=('Fredoka One', 10, 'normal'))
    print(f'Requested and ended in {elapsed_time}ms. FPS: {fps}')
    #request_draw_3D(t)
    afterFrame()

def catch_cache(t):
    """Display the current cache contents."""
    t.getscreen().tracer(3000)
    t.penup()
    t.hideturtle()
    t.color("gray")
    t.goto(-95, 50)
    t.write(
        f"Cache files: {len(cache_files)}",
        align="left",
        font=("Arial", 12, "normal"),
    )

    for index, cached in enumerate(cache_files):
        t.goto(-95, 30 - (index * 16))
        t.write(cached["name"], align="left", font=("Arial", 10, "normal"))

def open_starter_screen (t):
    t.getscreen().tracer(3000)
    t.penup()
    t.hideturtle()
    t.color('gray')
    t.goto(0 - (900 / 2), 0 - (700 / 2))
    t.begin_fill()
    t.forward(900)
    t.right(90)
    t.forward(700)
    t.right(90)
    t.forward(900)
    t.right(90)
    t.forward(700)
    t.end_fill()
    ms = 0
    

def main (t):
    request_draw_3D(t)
    main(t)

# get_mesh_by_name("cube")

def createLine (x1, y1, x2, y2, color, thickness):
    turtle.pensize(1)
    turtle.color(color)
    turtle.goto(x1, y1)
    turtle.pendown()
    turtle.goto(x2, y2)
    turtle.penup()    

def register_turtle (given_turtle):
    print("Initalizing Turtle...")
    global turtle
    global isTurtleRegistered
    if isTurtleRegistered == True:
        print("Couldn't Initalize The Turtle. It Is Already Initalized.")
        return
    else:
        turtle = given_turtle.Turtle()
        #turtle.onkey(w, 'w')
        #turtle.onkey(w, 's')
        #turtle.onkey(w, 'a')
        #turtle.onkey(w, 'd')
        #turtle.listen()
        #startListening(turtle)
        isTurtleRegistered = True
        print("Initalized Turtle.")
        #catch_cache(turtle)
        open_starter_screen(turtle)
        main(turtle)
        #request_draw_3D(turtle)
        #mainThread = threading.Thread(target=main, args=([turtle]))
        #mainThread.start()
        #main(turtle)

def OnAfterDrawing (define):
    if drawing == False and registeredAfterDraw == False:
        registeredAfterDraw = True
        define()

def createCamera (x, y, z, name, FOV):
    hasCamera = True
    cameras[name] = {"Camera"}
    cameraData[name] = {"for": name, "x": x, "y": y, "z": z, "fov": FOV}

def create3D (x, y, z, angle):
    if hasCamera == True and isConfigured == False and turtle != "N/A" and isTurtleRegistered == True:
        print('Creating 3D')
        print('Created 3D')

import turtle

if __name__ == "__main__":
    turtle.bgcolor('black')
    register_turtle(turtle)
    

