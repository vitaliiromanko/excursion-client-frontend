export class SiteCarouselExcursionItem {
  constructor(
    excursion_id,
    excursion_name,
    excursion_description,
    excursion_price,
    excursion_discount,
    excursion_photo
  ) {
    this.excursion_id = excursion_id;
    this.excursion_name = excursion_name;
    this.excursion_description = excursion_description;
    this.excursion_price = excursion_price;
    this.excursion_discount = excursion_discount;
    this.excursion_photo = excursion_photo;
  }
}

export class CardExcursionItem {
  constructor(
    excursion_id,
    excursion_name,
    excursion_description,
    excursion_price,
    excursion_discount,
    excursion_photo,
    excursion_rating,
    excursion_review_number,
    excursion_max_people_number,
    excursion_duration,
    excursion_duration_unit
  ) {
    this.excursion_id = excursion_id;
    this.excursion_name = excursion_name;
    this.excursion_description = excursion_description;
    this.excursion_price = excursion_price;
    this.excursion_discount = excursion_discount;
    this.excursion_photo = excursion_photo;
    this.excursion_rating = excursion_rating;
    this.excursion_review_number = excursion_review_number;
    this.excursion_max_people_number = excursion_max_people_number;
    this.excursion_duration = excursion_duration;

    if (excursion_duration_unit === "години") {
      this.excursion_duration_unit = "год.";
    } else if (excursion_duration_unit === "дні") {
      this.excursion_duration_unit = "дн.";
    }
  }
}

export class FilterValues {
  constructor(
    category,
    price,
    duration,
    movement_type,
    topic_type,
    conducting_type,
    max_people_number,
    start_date,
    organizer
  ) {
    this.category = category;
    this.price = price;
    this.duration = duration;
    this.movement_type = movement_type;
    this.topic_type = topic_type;
    this.conducting_type = conducting_type;
    this.max_people_number = max_people_number;
    this.start_date = start_date;
    this.organizer = organizer;
  }
}
