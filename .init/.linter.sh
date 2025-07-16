#!/bin/bash
cd /home/kavia/workspace/code-generation/car-customization-3d-5ae1eaf9/car_configurator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

