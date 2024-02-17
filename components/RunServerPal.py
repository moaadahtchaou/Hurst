input=input().split(" ")
a=int(input[0])
b=int(input[1])

output = 0
while not (a > b):
    a = a * 3
    b = b * 2
    output += 1

print(output)