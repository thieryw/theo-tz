#!/bin/bash

touch images.ts

> images.ts

FILES=$1*

declare -i X=0

for f in $FILES
do
    X=X+1
    echo "import img$X from \"$f\";" >> images.ts
done


X=0;


echo "export const images = [" >> images.ts

for f in $FILES
do
    X=X+1
    echo "img$X," >> images.ts
done

echo "];" >> images.ts

