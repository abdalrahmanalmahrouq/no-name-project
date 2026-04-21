# Use official PHP image
FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy existing application directory
COPY . .

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# The port Render assigns
ENV PORT=8000

# Start the Laravel server
CMD php artisan serve --host=0.0.0.0 --port=$PORT