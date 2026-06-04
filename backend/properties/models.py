from django.db import models


class Property(models.Model):
    PROPERTY_TYPES = [
        ('plot', 'Plot'),
        ('flat', 'Flat'),
        ('house', 'House'),
        ('shop', 'Shop'),
        ('land', 'Land'),
    ]

    property_name = models.CharField(max_length=150)
    survey_number = models.CharField(max_length=100)

    property_type = models.CharField(
        max_length=20,
        choices=PROPERTY_TYPES
    )

    area = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    owner_name = models.CharField(max_length=150)

    city = models.CharField(max_length=100)

    property_image = models.ImageField(
        upload_to='property_images/'
    )

    registration_pdf = models.FileField(
        upload_to='property_documents/'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.property_name