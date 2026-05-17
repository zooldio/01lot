"use client";

import { useState } from "react";
import { CountrySelect } from "@/components/ui/country-select";
import { PhoneInput } from "@/components/ui/phone-input";
import { Field } from "@/components/ui/form-field";

/**
 * Client-side signup form. Lives outside the (server-rendered) /signup page
 * so the page can still export `metadata`. State for the country + phone is
 * held here; everything else is uncontrolled to keep the implementation
 * simple. Backend wiring is presentational — `action="#"`.
 */
export function SignupForm() {
  const [country, setCountry] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("GB");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Convenience: when the user picks their country, mirror it to the phone
  // prefix selector — most people's mobile shares its country with their
  // residence. They can still change it explicitly.
  const onCountryChange = (code: string) => {
    setCountry(code);
    if (code) setPhoneCountry(code);
  };

  return (
    <form className="surface-card relative p-6 sm:p-8" action="#" method="post" noValidate>
      <h2 className="text-display text-[1.5rem] tracking-wide text-text">
        Start your arena account
      </h2>
      <p className="mt-1 text-[13px] text-text-muted">Free forever. No card required.</p>

      <div className="mt-7 space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="First name" required>
            <input type="text" name="firstName" required autoComplete="given-name" className="input" />
          </Field>
          <Field label="Last name" required>
            <input type="text" name="lastName" required autoComplete="family-name" className="input" />
          </Field>
        </div>

        <Field label="Email" required>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="trader@01lot.example"
            className="input"
          />
        </Field>

        <Field label="Password" required hint="Min 10 characters, 1 number, 1 symbol.">
          <input
            type="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="input"
          />
        </Field>

        <Field label="Country of residence" required>
          <CountrySelect
            name="country"
            value={country}
            onChange={onCountryChange}
            placeholder="Select your country"
            required
          />
        </Field>

        <Field label="Phone number" required hint="We text a code to confirm. Standard rates apply.">
          <PhoneInput
            country={phoneCountry}
            onCountryChange={setPhoneCountry}
            number={phoneNumber}
            onNumberChange={setPhoneNumber}
            name="phone"
            required
            placeholder="700 000 000"
          />
        </Field>

        <label className="flex items-start gap-2 text-[12.5px] text-text-dim">
          <input type="checkbox" required className="input-check mt-0.5" />
          <span>
            I&apos;m 18+ and accept the{" "}
            <a href="/terms" className="text-orange underline-offset-4 hover:underline">
              terms
            </a>
            ,{" "}
            <a href="/privacy" className="text-orange underline-offset-4 hover:underline">
              privacy
            </a>
            , and{" "}
            <a href="/risk" className="text-orange underline-offset-4 hover:underline">
              risk disclosure
            </a>
            .
          </span>
        </label>

        <button type="submit" className="btn-primary w-full justify-center !text-[13px]">
          Create account →
        </button>
      </div>

      <p className="mt-6 text-center text-[13px] text-text-dim">
        Already have one?{" "}
        <a href="https://platform.01lot.com/login" className="text-orange underline-offset-4 hover:underline">
          Sign in
        </a>
        .
      </p>
    </form>
  );
}
