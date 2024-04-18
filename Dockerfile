# Use an official Python runtime as a parent image
FROM python:3.9

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE news_Application.settings

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Expose the port your Django app will run on
EXPOSE 8000

# Define the command to run your Django app 
CMD ["python3", "news_Application/manage.py", "runserver", "0.0.0.0:8000"]
